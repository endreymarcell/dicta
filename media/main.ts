const vscode = acquireVsCodeApi();
setInterval(() => {
        vscode.postMessage({
            command: 'alert',
            text: 'Kilroy was here',
        });
}, 3000);
