const PACKAGE_JSON = require("../package.json");
const cliInit = require("./cliInit.js")
const cliSync = require("./cliSync.js")
const cliExample = require("./cliExample.js")
module.exports = function cli(program){
  program
  .name(PACKAGE_JSON.name)
  .description(PACKAGE_JSON.description)
  .version(PACKAGE_JSON.version, '-v, --version')

  // 初始化配置
  program
    .command("init")
    .alias("i")
    .description("初始化svg2font配置")
    .action(() => {
      cliInit();
    });

  // 生成字体图标
  program
    .command("sync")
    .alias("s")
    .description("生成字体图标")
    .action(() => {
      cliSync();
    });

  // 生成icon列表页面
  program
    .command("example")
    .alias("e")
    .description("生成页面显示icon列表")
    .action(() => {
      cliExample();
    });
}

