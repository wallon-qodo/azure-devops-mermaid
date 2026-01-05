// PR Description Mermaid Observer
// This script watches for Mermaid code blocks in PR descriptions and renders them

import Mermaid from "mermaid";

console.log('[ADO Mermaid PR Observer] Loading...');

// Initialize Mermaid
Mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose'
});

// Function to find and render Mermaid code blocks
function renderMermaidInElement(element) {
  console.log('[ADO Mermaid PR Observer] Checking element for Mermaid code');

  // Look for code blocks with language-mermaid class (standard GitHub/Markdown rendering)
  const codeBlocks = element.querySelectorAll('code.language-mermaid, pre code.language-mermaid');

  if (codeBlocks.length > 0) {
    console.log(`[ADO Mermaid PR Observer] Found ${codeBlocks.length} Mermaid code blocks`);
  }

  codeBlocks.forEach((codeBlock, index) => {
    try {
      const mermaidCode = codeBlock.textContent;
      console.log(`[ADO Mermaid PR Observer] Rendering block ${index}:`, mermaidCode.substring(0, 50));

      // Create a new div to hold the rendered diagram
      const container = document.createElement('div');
      container.className = 'mermaid-diagram';
      container.setAttribute('data-processed', 'true');
      container.textContent = mermaidCode;

      // Replace the code block with the diagram container
      const preElement = codeBlock.closest('pre') || codeBlock.parentElement;
      preElement.parentNode.replaceChild(container, preElement);

      // Render the diagram
      Mermaid.run({
        nodes: [container]
      }).then(() => {
        console.log(`[ADO Mermaid PR Observer] Successfully rendered diagram ${index}`);
      }).catch(err => {
        console.error(`[ADO Mermaid PR Observer] Error rendering diagram ${index}:`, err);
        // Restore original code block on error
        container.textContent = `Error rendering Mermaid diagram: ${err.message}\n\n${mermaidCode}`;
      });
    } catch (error) {
      console.error('[ADO Mermaid PR Observer] Error processing code block:', error);
    }
  });

  // Also look for ```mermaid``` blocks that might not be properly formatted
  // This handles cases where Azure DevOps doesn't add the language-mermaid class
  const allPre = element.querySelectorAll('pre');
  allPre.forEach((pre) => {
    const code = pre.querySelector('code');
    if (code && !code.hasAttribute('data-mermaid-processed')) {
      const text = code.textContent.trim();
      // Check if it starts with common Mermaid keywords
      if (text.match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|journey|gitGraph)/)) {
        console.log('[ADO Mermaid PR Observer] Found unformatted Mermaid diagram');
        code.setAttribute('data-mermaid-processed', 'true');

        const container = document.createElement('div');
        container.className = 'mermaid-diagram';
        container.textContent = text;
        pre.parentNode.replaceChild(container, pre);

        Mermaid.run({
          nodes: [container]
        });
      }
    }
  });
}

// Create a MutationObserver to watch for dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        renderMermaidInElement(node);
      }
    });
  });
});

// Start observing when DOM is ready
function startObserving() {
  console.log('[ADO Mermaid PR Observer] Starting to observe DOM');

  // Process existing content
  renderMermaidInElement(document.body);

  // Watch for future changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserving);
} else {
  startObserving();
}

console.log('[ADO Mermaid PR Observer] Initialized');
