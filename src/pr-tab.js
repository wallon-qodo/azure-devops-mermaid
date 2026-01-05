import * as SDK from "azure-devops-extension-sdk";
import { getClient } from "azure-devops-extension-api";
import { GitRestClient } from "azure-devops-extension-api/Git";
import Mermaid from "mermaid";

console.log('[ADO Mermaid PR Tab] Script loaded, initializing...');

// Initialize Mermaid
Mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose'
});

await (async function () {
  console.log('[ADO Mermaid PR Tab] Calling SDK.init()...');
  SDK.init();

  console.log('[ADO Mermaid PR Tab] Waiting for SDK.ready()...');
  await SDK.ready();
  console.log('[ADO Mermaid PR Tab] SDK ready!');

  try {
    // Get the PR context
    const config = SDK.getConfiguration();
    console.log('[ADO Mermaid PR Tab] Configuration:', config);

    // Get context from SDK (safe way without cross-origin issues)
    const host = SDK.getHost();
    const webContext = SDK.getWebContext();

    console.log('[ADO Mermaid PR Tab] Host:', host);
    console.log('[ADO Mermaid PR Tab] Web Context:', webContext);
    console.log('[ADO Mermaid PR Tab] Config:', config);

    // Try to get context from various sources
    let projectName, repositoryName, repositoryId, pullRequestId;

    // Method 1: Get from web context (most reliable)
    projectName = webContext?.project?.name;
    repositoryName = webContext?.repository?.name;
    repositoryId = webContext?.repository?.id;

    // Method 1.5: Get repository ID from config if available
    if (!repositoryId && config?.repositoryId) {
      repositoryId = config.repositoryId;
      console.log('[ADO Mermaid PR Tab] Got repository ID from config:', repositoryId);
    }

    // Method 2: Try to extract from host.uri if available
    if (!projectName || !repositoryName) {
      const hostUri = host?.uri || '';
      console.log('[ADO Mermaid PR Tab] Host URI:', hostUri);

      // URL format: https://dev.azure.com/{org}/{project}/_git/{repo}/pullrequest/{prId}
      const uriMatch = hostUri.match(/\/([^\/]+)\/_git\/([^\/]+)\/pullrequest\/(\d+)/);

      if (uriMatch) {
        projectName = projectName || decodeURIComponent(uriMatch[1]);
        repositoryName = repositoryName || decodeURIComponent(uriMatch[2]);
        pullRequestId = pullRequestId || uriMatch[3];
        console.log('[ADO Mermaid PR Tab] Parsed from host URI');
      }
    }

    // Method 3: Get PR ID from various sources
    // First, try configuration (most reliable for PR tabs)
    if (config?.pullRequestId) {
      pullRequestId = config.pullRequestId;
      console.log('[ADO Mermaid PR Tab] Got PR ID from config:', pullRequestId);
    }

    // Fallback methods if config doesn't have it
    if (!pullRequestId) {
      // Try query params
      const urlParams = new URLSearchParams(window.location.search);
      pullRequestId = urlParams.get('pullRequestId') || urlParams.get('_a');

      // Try extracting from current URL hash/path
      if (!pullRequestId && window.location.href) {
        const currentUrlMatch = window.location.href.match(/pullrequest[\/=](\d+)/);
        if (currentUrlMatch) {
          pullRequestId = currentUrlMatch[1];
        }
      }
    }

    console.log('[ADO Mermaid PR Tab] Final context - Project:', projectName, 'Repository ID:', repositoryId, 'Repository Name:', repositoryName, 'PR:', pullRequestId);

    if (!projectName || !pullRequestId) {
      throw new Error(`Could not determine context. Project: ${projectName || 'missing'}, Repo: ${repositoryName || 'missing'}, RepoId: ${repositoryId || 'missing'}, PR: ${pullRequestId || 'missing'}. WebContext: ${JSON.stringify(webContext)}`);
    }

    // Get Git client
    const gitClient = getClient(GitRestClient);

    // Fetch PR - we can use either repository ID or name
    let pullRequest;
    const repoIdentifier = repositoryId || repositoryName;

    if (!repoIdentifier) {
      throw new Error('Neither repository ID nor repository name is available');
    }

    console.log('[ADO Mermaid PR Tab] Fetching PR details using repo identifier:', repoIdentifier);

    try {
      pullRequest = await gitClient.getPullRequest(repoIdentifier, parseInt(pullRequestId), projectName);
      console.log('[ADO Mermaid PR Tab] Successfully fetched PR');
    } catch (error) {
      console.error('[ADO Mermaid PR Tab] Error fetching PR:', error);
      throw new Error(`Failed to fetch pull request: ${error.message}`);
    }

    console.log('[ADO Mermaid PR Tab] PR Description:', pullRequest.description?.substring(0, 200));

    // Extract Mermaid code blocks from description
    const description = pullRequest.description || '';
    const mermaidBlocks = extractMermaidBlocks(description);

    console.log('[ADO Mermaid PR Tab] Found', mermaidBlocks.length, 'Mermaid blocks');

    // Render the diagrams
    renderMermaidDiagrams(mermaidBlocks);

    SDK.notifyLoadSucceeded();
    console.log('[ADO Mermaid PR Tab] Tab loaded successfully');

  } catch (error) {
    console.error('[ADO Mermaid PR Tab] Error loading PR data:', error);
    displayError(error.message);
    SDK.notifyLoadSucceeded(); // Still notify success to show the error message
  }
}());

// Extract Mermaid code blocks from markdown text
function extractMermaidBlocks(text) {
  const blocks = [];

  // Match ```mermaid ... ``` blocks
  const regex = /```mermaid\s*\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    blocks.push(match[1].trim());
  }

  console.log('[ADO Mermaid PR Tab] Extracted blocks:', blocks);
  return blocks;
}

// Render Mermaid diagrams
async function renderMermaidDiagrams(blocks) {
  const container = document.getElementById('pr-mermaid-content');

  if (blocks.length === 0) {
    container.innerHTML = '<div class="no-diagrams">No Mermaid diagrams found in the PR description.</div>';
    return;
  }

  container.innerHTML = '<h2>Mermaid Diagrams from PR Description</h2>';

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    try {
      const diagramDiv = document.createElement('div');
      diagramDiv.className = 'mermaid-container';

      const mermaidDiv = document.createElement('div');
      mermaidDiv.className = 'mermaid-diagram';
      mermaidDiv.textContent = block;

      diagramDiv.appendChild(mermaidDiv);
      container.appendChild(diagramDiv);

      console.log('[ADO Mermaid PR Tab] Rendering diagram', i + 1);

      // Render the diagram
      await Mermaid.run({
        nodes: [mermaidDiv]
      });

      console.log('[ADO Mermaid PR Tab] Successfully rendered diagram', i + 1);

    } catch (error) {
      console.error('[ADO Mermaid PR Tab] Error rendering diagram', i + 1, ':', error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = `Error rendering diagram ${i + 1}: ${error.message}`;
      container.appendChild(errorDiv);
    }
  }
}

// Display error message
function displayError(message) {
  const container = document.getElementById('pr-mermaid-content');
  container.innerHTML = `
    <div class="error-message">
      <strong>Error loading Mermaid diagrams:</strong><br>
      ${message}
    </div>
    <div class="no-diagrams">
      Please make sure you have permission to access this pull request.
    </div>
  `;
}
