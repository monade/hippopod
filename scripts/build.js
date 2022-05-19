module.exports.build = function (argv) {
  const { exec } = require("./utils");

  return exec("yarn build");
};

module.exports.distributeBuild = function () {
  const { exec } = require("./utils");

  console.log("\n");
  console.log("🚧 distribute build 🚧");
  console.log("\n");
  return exec("echo 'TODO'");
};
