/// <reference lib="dom" />

const vscode = acquireVsCodeApi();

window.addEventListener('message', event => {
    const data = event.data;
    const parsed = JSON.parse(data);
    const [spoken, vim] = parsed;
    
    const spokenElement = window.document?.getElementById('spoken');
    if (spokenElement) {
        spokenElement.innerHTML = removeControlChars(spoken);
    }
    const vimElement = window.document?.getElementById('vim');
    if (vimElement) {
        vimElement.innerHTML = replaceControlChars(vim);
    }
});

function removeControlChars(input: string): string {
    return input.replace(/<c:.*>/g, '');
}

function replaceControlChars(input: string): string {
    return input.replace('<c:enter>', '⏎').replace('<c:escape>', '⎋')
}
