/// <reference lib="dom" />

const vscode = acquireVsCodeApi();

window.addEventListener('message', event => {
    const data = event.data;
    const parsed = JSON.parse(data);
    const [spoken, vim] = parsed;
    
    const spokenElement = window.document?.getElementById('spoken');
    if (spokenElement) {
        spokenElement.innerHTML = spoken;
    }
    const vimElement = window.document?.getElementById('vim');
    if (vimElement) {
        vimElement.innerHTML = vim;
    }
});
