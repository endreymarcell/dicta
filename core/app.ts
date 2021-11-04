import { correct } from "./lib/corrector";
import { broadcastError, broadcastMessage, startServer } from "./lib/dispatcher";
import { parse } from "./lib/parser";
import { startListening } from "./lib/speech";

function main() {
    startServer();
    startListening(data => {
      console.log('--------------------------------')
        console.log(`I heard: "${data}"`);

        const corrected = correct(data);
        console.log(`I corrected it to: "${corrected}"`)

		try {
			const parsedResults = parse(corrected.trim());
			console.log(`And I parsed it to: "${parsedResults}"\n`)
			broadcastMessage(corrected, parsedResults);
		} catch (err: any) {
			if (err.message === "Pattern matching failed") {
				console.error(`Pattern matching failed :(`)
				broadcastError(corrected);
			} else {
				console.error(err.message)
			}
		}
    });
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
