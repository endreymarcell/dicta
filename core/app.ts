import { correct } from "./corrector";
import { broadcast, startServer } from "./lib/dispatcher";
import { parse } from "./lib/parser";
import { startListening } from "./lib/speech";

function main() {
    startServer();
    startListening(data => {
        console.log('Raw:', data)

        const corrected = correct(data);
        console.log('Corrected:', corrected)

        const parsedResults = parse(corrected.trim());
        console.log('Parsed:', parsedResults)
        console.log('');

        broadcast(data, parsedResults);
    });
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
