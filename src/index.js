import * as SDK from "azure-devops-extension-sdk";
import Mermaid from "mermaid";
import mermaidViewer from './viewer.js'

// Debug: Check loading context
if (window.top !== window.self) {
	console.log('[ADO Mermaid Viewer] Running in iframe - extension context detected');
} else {
	console.log('[ADO Mermaid Viewer] Running in main window');
}

console.log('[ADO Mermaid Viewer] Script loaded, initializing...');

await (async function () {
	console.log('[ADO Mermaid Viewer] Calling SDK.init()...');
	SDK.init({ loaded: false });

	console.log('[ADO Mermaid Viewer] Waiting for SDK.ready()...');
	await SDK.ready();
	console.log('[ADO Mermaid Viewer] SDK ready!');

	console.log('[ADO Mermaid Viewer] Initializing Mermaid...');
	Mermaid.initialize({ startOnLoad: false });
	console.log('[ADO Mermaid Viewer] Mermaid initialized');

	// Register with specific ID matching manifest's registeredObjectId
	console.log('[ADO Mermaid Viewer] Registering renderer...');
	SDK.register("mermaid_renderer", function (context) {
		console.log('[ADO Mermaid Viewer] Renderer registered with context:', context);
		return mermaidViewer;
	});

	SDK.notifyLoadSucceeded();
	console.log('[ADO Mermaid Viewer] Extension loaded successfully, ready to render');
}());
