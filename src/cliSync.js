const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const cwd = process.cwd();
const CreateSVG = require('./utils/CreateSvg.js');
const CreateTTF = require('./utils/CreateTtf.js');
const CreateEot = require('./utils/CreateEot.js');
const CreateWoff = require('./utils/CreateWoff.js');
const CreateWoff2 = require('./utils/CreateWoff2.js');
const CreateCss = require('./utils/CreateCss.js');
module.exports = async () => {
  const configFile = "svg2font.config.js";
  const configPath = path.join(cwd, configFile);
  if (!fs.existsSync(configPath)) {
    console.log(chalk.red(`请检查 ${configPath} 配置文件是否正确\n`));
    process.exit(1);
  }
  let options = require(configPath);

  if(!fs.existsSync(options.outputPath)) {
    fs.mkdirSync(options.outputPath, { recursive: true }, (err) => {
      if(err) {
        console.log(chalk.red(`常见文件夹 ${options.outputPath} 失败\n`));
        process.exit(1);
      }
    })
  }
  await CreateSVG(options);
  const ttf = await CreateTTF(options);
  await CreateEot(options, ttf);
  await CreateWoff(options, ttf);
  await CreateWoff2(options, ttf);
  await CreateCss(options);
}