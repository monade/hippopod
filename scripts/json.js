module.exports.buildJson = function (argv) {
  const { exec } = require("./utils");

  const [color, theme, themeMode] = argv;
  const json = {
    color,
    theme,
    themeMode
  };

  return exec(`echo '${JSON.stringify(json)}' > src/data/arguments.json`);
}