const { layouts } = require("./layouts");
const { moods } = require("./moods");

module.exports.checkCorrectArguments = (argv) => {
  if(argv.length < 4 || argv.length > 4 || !moods.includes(argv[2]) || !layouts.includes(argv[3]) || !module.exports.isHexColor(argv[0]) || !module.exports.isHexColor(argv[1])) {
    console.log("\n", "Usage: node start.js <primary-color> <secondary-color> <mood> <layout>", "\n");
    console.log("    <primary-color> is the primary color of the theme");
    console.log("                    it should be a hexadecimal color (es. ffffff)", "\n");
    console.log("    <secondary-color> is the secondary color of the theme");
    console.log("                      it should be a hexadecimal color (es. ffffff)", "\n");
    console.log("    <mood> is the mood of the theme");
    console.log("           it should be one of the following: ", moods, "\n");
    console.log("    <layout> is the layout of the theme");
    console.log("             it should be one of the following: ", layouts, "\n");

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
  const [primaryColor, secondaryColor, mood, layout] = argv;
    console.log("currently selected theme:");
    console.log("    - primary color: # ", primaryColor);
    console.log("    - secondary color: # ", secondaryColor);
    console.log("    - mood: ", mood);
    console.log("    - layout: ", layout, "\n\n");
}

module.exports.isHexColor = function (color) {
  if (typeof color !== "string") {
    return false;
  }
  if (color.length !== 6) {
    return false;
  };
  const hexRegex = /^[0-9a-fA-F]+$/;
  return hexRegex.test(color);
}
