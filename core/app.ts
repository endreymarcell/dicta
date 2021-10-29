import { correct } from "./corrector";
import { broadcast, startServer } from "./lib/dispatcher";
import { parse } from "./lib/parser";
import { startListening } from "./lib/speech";

function main() {
    startServer();
    startListening(data => {
      console.log('--------------------------------')
        console.log(`I heard: "${data}"`);

        const corrected = correct(data);
        console.log(`I corrected it to: "${corrected}"`)

        const parsedResults = parse(corrected.trim());
        console.log(`And I parsed it to: "${parsedResults}"\n`)

        broadcast(data, parsedResults);
    });
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
