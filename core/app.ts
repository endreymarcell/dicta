import { broadcast, startServer } from "./lib/dispatcher";
import { parse } from "./lib/parser";
import { startListening } from "./lib/speech";

function main() {
    startServer();
    startListening(data => {
        console.log('Raw:', data)
        const parsedResults = parse(data.trim());
        console.log('Parsed:', parsedResults)
        console.log('');

        broadcast(parsedResults);
    });
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
