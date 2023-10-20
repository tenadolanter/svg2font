const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const cwd = process.cwd();
const ejs = require("ejs");
const express = require("express");
const app = express();
const open = require('open');
module.exports = async () => {
  const configFile = "svg2font.config.js";
  const configPath = path.join(cwd, configFile);
  if (!fs.existsSync(configPath)) {
    console.log(chalk.red(`请检查 ${configPath} 配置文件是否正确\n`));
    process.exit(1);
  }
  let options = require(configPath);
  if(!options.examplePath){
    console.log(chalk.red(`请检查配置文件，缺少examplePath\n`));
    process.exit(1);
  }
  if (!options.ejs) {
    const ejsPath = path.join(__dirname, "./index.ejs");
    options.ejs = ejsPath;
  }

  // 获取所有icon列表
  let svgIcons = [];
  const svgConfigPath = path.join(options.outputPath, "config.json")
  try {
    svgIcons = JSON.parse(
      fs.readFileSync(svgConfigPath, { encoding: "utf8" })
    );
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`'没有找到文件${svgConfigPath}'`);
    } else {
      throw err;
    }
  }
  const examplePath = options.examplePath;
  const outPath = options.outputPath;
  const findCommonSubstring = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const result = [];
    const maxLength = Math.max(len1, len2);
    for (let i = 0; i < maxLength; i++) {
      if (str1[i] === str2[i]) {
        result.push(str1[i]);
      } else {
        break; // 停止比较，找到不同字符
      }
    }
    return result.join('');
  }
  const commonPart = findCommonSubstring(examplePath, outPath);
  let cssPath;
  if(commonPart) {
    let relativePath = outPath.replace(commonPart, '');
    if(!relativePath.startsWith("/")) {
      relativePath = `/${relativePath}`
    }
    cssPath = `.${relativePath}/index.min.css`
  } else {
    cssPath = `../${outPath}/index.min.css`
  }
  // 生成example
  ejs.renderFile(
    options.ejs,
    { cssPath: cssPath, icons: svgIcons, options: options },
    {},
    function (err, str) {
      // str => 输出渲染后的 HTML 字符串
      fs.writeFile(examplePath, str, { encoding: "utf8" }, (err) => {
        if (err) throw err;
        console.log(`生成静态页面 ${examplePath}`);
        const staticPath = examplePath.replace("/index.html", "");
        app.use(express.static(staticPath));
        app.listen(options.examplePort, () => {
          console.log(
            `server start: http://localhost:${options.examplePort}/`
          );
          open(`http://localhost:${options.examplePort}/`)
        });
      });
    }
  );
};
