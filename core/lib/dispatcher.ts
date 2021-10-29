import { spawn } from 'child_process';
import ws from 'ws';

let vscode: ws;  // Thanks a lot, ws

export function startServer() {
    const server = new ws.Server({ port: 7071 }, () => console.log('The WS server has started.'))
    server.on('connection', newClient => {
        console.log('VS Code has connected to the WS server');
        vscode = newClient
    })
}

export function broadcastMessage(spoken: string, parsed: string) {
    spawn('sendkeys', ['send', '-a', 'Code', '-i', '0.2', '-d', '0.04', '-c', parsed])
    if (vscode) {
        vscode.send(JSON.stringify(['message', spoken, parsed]));
    }
}

export function broadcastError(spoken: string) {
    if (vscode) {
        vscode.send(JSON.stringify(['error', spoken]))
    }
}
