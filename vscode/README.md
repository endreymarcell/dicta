# dicta-vscode

A VS Code extension to display the spoken text and the resulting vim commands. The extension itself is perfectly dumb, it receives all of that info from the dicta-core package over a web socket.  

## Usage
- Compile the extension using `npm run compile`  
- Open this folder in VS Code: `code .`
- Start a debugging session (F5 I guess, or just type 'debug' in the command palette)
- In the opened window, open the command palette and type "open dicta" - the extension will open in a new editor tab
- Preferably drag the dicta tab to the bottom of the screen to split the screen and put it on the bottom half
