module.exports.build = function (argv) {
  const { exec } = require("./utils");

  return exec("yarn build");
}