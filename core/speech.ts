/// <reference path="./node-record-lpcm16.d.ts" />

import recorder from 'node-record-lpcm16';
import speech from '@google-cloud/speech';
import { spawn } from 'child_process';
import ws from 'ws';

let vscode: ws;  // Thanks a lot, ws

const config = {
  encoding: 'LINEAR16' as const,
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  config,
  interimResults: false,
};

function broadcast(message: string) {
  console.log('Sending message to `sendkeys`:', message);
  spawn('sendkeys', ['send', '-a', 'Code', '-i', '0.2', '-d', '0.04', '-c', message])
  if (vscode) {
    console.log('Sending message to VS Code too')
    vscode.send(message);
  }
}

function main() {
  const server = new ws.Server({ port: 7071 })
  server.on('connection', newClient => {
    console.log('VS Code has connected to the WS server');
    vscode = newClient
  })

  const client = new speech.SpeechClient();

  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      const result = data.results[0]?.alternatives[0]
      if (result) {
        console.log(result.transcript);
        broadcast(result.transcript);
      } else {
        console.error('ran out of tokens')
      }
    });

  recorder
    .record({
      sampleRateHertz: config.sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: 'rec',
      silence: '5.0', //seconds of silence before ending
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
