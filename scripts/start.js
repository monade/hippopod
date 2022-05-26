const { checkCorrectArguments, printArguments } = require("./arguments");
const { build } = require("./build");
const { buildJson } = require("./json");

(async function () {
  try {
    console.log("\nWelocome to Hippopod site generator 🦛", "\n");

    const argv = process.argv.slice(2);
    try {
      checkCorrectArguments(argv);
    } catch (error) {
      throw error;
    }
    printArguments(argv);
    await buildJson(argv);
    await build();

    console.log("\nSuccesfully created your Hippopod site 🦛", "\n");
  } catch (error) {
    console.error(error);
    process.exit((error && error.code) || 1);
  }
})();
