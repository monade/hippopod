module.exports.buildJson = function (argv) {
  const { exec } = require("./utils");

  const [color, theme] = argv;
  const json = {
    color,
    theme
  };

  return exec(`echo '${JSON.stringify(json)}' > src/data/arguments.json`);
}