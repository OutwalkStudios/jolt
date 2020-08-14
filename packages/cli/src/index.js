/* imports */
import { Parser } from "./utils/Parser";
import version from "./cmd/version";
import help from "./cmd/help";
import create from "./cmd/create";
import update from "./cmd/update";
import build from "./cmd/build";
import watch from "./cmd/watch";
import lint from "./cmd/lint";
import serve from "./cmd/serve";

/* parse the cli arguments */
const args = Parser.parseCLIArgs(process.argv.slice(2));
let cmd = args._[0] || "help";

/* determine what action to run */
if (args.version || args.v) cmd = "version";
else if (args.help || args.h) cmd = "help";

const commands = {
    "version": version,
    "help": help,
    "create": create,
    "update": update,
    "build": build,
    "watch": watch,
    "lint": lint,
    "serve": serve
};

if (commands[cmd]) commands[cmd](args);
else console.error(`Unknown Command: ${cmd}`);