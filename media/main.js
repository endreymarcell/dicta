// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
    const vscode = acquireVsCodeApi();
    setInterval(() => {
            vscode.postMessage({
                command: 'alert',
                text: 'Marca was here',
            });
    }, 3000);
}());
