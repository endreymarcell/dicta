/// <reference path="./node-record-lpcm16.d.ts" />

import recorder from 'node-record-lpcm16';
import speech from '@google-cloud/speech';

const config = {
  encoding: 'LINEAR16' as const,
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const request = {
  config,
  interimResults: false,
};

export function startListening(onDataReceived: (data: string) => void) {
  const client = new speech.SpeechClient();

  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
      const result = data.results[0]?.alternatives[0]
      if (result) {
        onDataReceived(result.transcript);
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
