import { broadcast, startServer } from "./lib/dispatcher";
import { startListening } from "./lib/speech";

function main() {
    startServer();
    startListening(data => broadcast(data));
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exitCode = 1;
});

main();
