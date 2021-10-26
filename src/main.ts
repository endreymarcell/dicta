const vscode = acquireVsCodeApi();
vscode.postMessage({
    command: 'alert',
    text: 'The extension is running',
});
