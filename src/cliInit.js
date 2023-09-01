const fs = require("fs");
const inquirer = require("inquirer");
const prettier = require("prettier");
const chalk = require("chalk");
const defaultConfig = require("./config.js");
module.exports = async () => {
  const configName = "svg2font.config.js";
  const defaultPath = `./${configName}`;
  let isConfigExist = true;
  try {
    fs.accessSync(defaultPath)
  } catch(e) {
    isConfigExist = false;
  }
  if(isConfigExist){
    const ans = await inquirer.prompt([{
      name: 'overwrite',
      type: 'confirm',
      message: `配置文件${configName}已存在，是否覆盖？`,
    }])
    if (!ans.overwrite) process.exit(0);
  }
  const options = {
    ...defaultConfig,
  }
  let content = `module.exports = ${JSON.stringify(options)}`;
  content = prettier.format(content, { parser: 'babel', singleQuote: true, trailingComma: 'es5', })
  fs.writeFileSync(defaultPath, content, 'utf8', err => {
    if(err) {
      console.log(chalk.red(err));
      process.exit(2);
    } else {
      console.log(chalk.green("初始化成功~"));
    }
  });
}