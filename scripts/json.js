module.exports.buildJson = function (argv) {
  const { exec } = require("./utils");

  const [primaryColor, secondaryColor, mood, layout] = argv;

  const json = {
    primaryColor,
    secondaryColor,
    mood,
    layout
  };

  return exec(`echo '${JSON.stringify(json)}' > src/data/arguments.json`);
}