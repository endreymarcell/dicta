'use strict';
const { spawn } = require('child_process')
const ws = require('ws')

let wtf = {
  client: undefined,
};

function sendKeys(str) {
  spawn('sendkeys', ['send', '-a', 'Code', '-i', '0.2', '-d', '0.04', '-c', str])
  if (wtf.client) {
    console.log('sending to client too')
    wtf.client.send(str);
  }
}

function main(
  encoding = 'LINEAR16',
  sampleRateHertz = 16000,
  languageCode = 'en-US'
) {
  const recorder = require('node-record-lpcm16');
  const speech = require('@google-cloud/speech');

  const server = new ws.Server({ port: 7071 })
  server.on('connection', newClient => {
    console.log('somebody connected!');
    wtf.client = newClient
  })

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const request = {
    config,
    interimResults: false, //Get interim results from stream
  };

  const client = new speech.SpeechClient();

  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      const result = data.results[0]?.alternatives[0]
      if (result) {
        console.log(result.transcript);
        sendKeys(result.transcript);
      } else {
        console.error('ran out of tokens')
      }
    });

  recorder
    .record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '5.0', //seconds of silence before ending
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
