const { checkCorrectArguments, printArguments } = require("./arguments");
const { build, distributeBuild } = require("./build");
const { buildJson } = require("./json");

(async function () {
  try {
    console.log("\n");
    console.log("Welocome to Hippopod site generator 🦛", "\n");
    const { exec } = require("./utils");

    const argv = process.argv.slice(2);

    try {
      checkCorrectArguments(argv);
    } catch (error) {
      throw error;
    }

    printArguments(argv);

    await buildJson(argv);

    await build();

    await distributeBuild();

    console.log("\n");
    console.log("Succesfully created your Hippopod site 🦛", "\n");
  } catch (error) {
    console.error(error);
    process.exit((error && error.code) || 1);
  }
})();
