# dicta-core

NodeJS script to  
- perform voice recognition (using Google Cloud) including some corrections,
- parse text as vim commands, and
- send to VS Code both
  - the commands (as actual key events) and
  - the spoken text (to be displayed by the extension in the companion `vscode` package).

I hoped that I would be able to make all of this work in the VS Code extension, but alas, that has no access to the microphone stream, so I needed to put the speech recognition part into a separate script and send the results over using a web socket. What's more, Code doesn't even expose an API to send keystrokes to the editor, so I used a utility software called SendKeys to actually send the key events to Code. It all became disappointingly cumbersome, but it did work.

## Setup
- Setup authentication for the `@google-cloud/speech` package as described at https://github.com/googleapis/nodejs-speech  
- Install `sendkeys` from https://github.com/socsieng/sendkeys-macos
- Install pnpm: `npm i -g pnpm`
- Bootstrap the workspace: `pnpm i`
