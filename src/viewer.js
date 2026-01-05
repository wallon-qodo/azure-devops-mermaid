import { marked } from "marked";
import Mermaid from "mermaid";

const mermaidViewer = (function () {
	"use strict";
	return {
		renderContent: function (rawContent, options) {
			console.log('[ADO Mermaid Viewer] renderContent called with content length:', rawContent?.length);
			console.log('[ADO Mermaid Viewer] Options:', options);

			// Configure marked to support GFM (GitHub Flavored Markdown)
			marked.setOptions({
				gfm: true,
				breaks: true,
			});

			// Convert markdown to HTML with GFM support (including tables)
			var resultHtml = marked.parse(rawContent);
			console.log('[ADO Mermaid Viewer] Markdown parsed');

			// Get the container and inject the rendered HTML
			var container = document.getElementById('md-mermaid-viewer');
			container.innerHTML = resultHtml;
			
			// Find all mermaid code blocks
			var mermaidParagraphs = container.querySelectorAll('pre > code.language-mermaid')
			console.log('[ADO Mermaid Viewer] Found', mermaidParagraphs.length, 'mermaid code blocks');

			// Parse the mermaid strings
			var parser = new DOMParser();
			mermaidParagraphs.forEach((p) => {
				var parsed = parser.parseFromString(p.innerHTML, 'text/html')
				p.innerHTML = parsed.documentElement.textContent

				// Add class to indicate the node should be rendered
				p.classList.add('mermaid')
			})

			// Generate the mermaid diagrams
			if (mermaidParagraphs.length > 0) {
				console.log('[ADO Mermaid Viewer] Running Mermaid.run()...');
				Mermaid.run().then(() => {
					console.log('[ADO Mermaid Viewer] Diagrams rendered successfully');
				}).catch(err => {
					console.error('[ADO Mermaid Viewer] Error rendering diagrams:', err);
				});
			}
		}
	};
}());

export default mermaidViewer


