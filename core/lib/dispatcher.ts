import { spawn } from 'child_process';
import ws from 'ws';

let vscode: ws;  // Thanks a lot, ws


export function broadcast(message: string) {
    console.log('Sending message to `sendkeys`:', message);
    spawn('sendkeys', ['send', '-a', 'Code', '-i', '0.2', '-d', '0.04', '-c', message])
    if (vscode) {
        console.log('Sending message to VS Code too')
        vscode.send(message);
    }
}

export function startServer() {
    const server = new ws.Server({ port: 7071 })
    server.on('connection', newClient => {
        console.log('VS Code has connected to the WS server');
        vscode = newClient
    })
}
