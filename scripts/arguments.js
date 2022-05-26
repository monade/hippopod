const { themes } = require("./themes");

const themeMode = ['light', 'dark'];

module.exports.checkCorrectArguments = (argv) => {
  if(argv.length !== 3 || !module.exports.isHexColor(argv[0]) || !themes.includes(argv[1]) || !themeMode.includes(argv[2])) {
    console.log("\n", "Usage: node start.js <color> <theme>", "\n");
    console.log("    <color> is the primary color of the theme");
    console.log("                    it should be a hexadecimal color (es. ffffff)", "\n");
    console.log("    <theme> is the theme");
    console.log("           it should be one of the following: ", themes, "\n");
    console.log("    <theme-mode> is the mode of the theme");
    console.log("           it should be one of the following: ", themeColor, "\n");

    console.log("Example: node start.js ffffff ffffff regular card", "\n");
    console.log("This will create an application with the following theme:");
    console.log("    - primary color: #ffffff");
    console.log("    - secondary color: #ffffff");
    console.log("    - mood: regular");
    console.log("    - layout: card", "\n");

    module.exports.printArguments(argv);

    throw new Error(`Unprocessable arguments passed ${argv}`);
  }
}

module.exports.printArguments = (argv) => {
  const [color, theme, themeMode] = argv;
    console.log("currently selected theme:");
    console.log(`    - color: #${color}`);
    console.log("    - theme: ", theme);
    console.log('    - theme mode: ', themeMode , "\n\n")
}

module.exports.isHexColor = function (color) {
  if (typeof color !== "string") {
    return false;
  }
  if (color.length !== 6) {
    return false;
  }
  const hexRegex = /^[0-9a-fA-F]+$/;
  return hexRegex.test(color);
}
