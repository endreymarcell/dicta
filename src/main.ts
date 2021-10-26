/// <reference lib="dom" />

const vscode = acquireVsCodeApi();
vscode.postMessage('The extension is running');

window.addEventListener('message', event => {
    const data = event.data;
    vscode.postMessage(data);
});
