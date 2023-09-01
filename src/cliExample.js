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
  if (!options.ejs) {
    const ejsPath = path.join(cwd, "./src/index.ejs");
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
  const firstExamplePath = examplePath.split("/")?.[0];
  const firstOutPath = outPath.split("/")?.[0];
  let cssPath;
  if(firstExamplePath === firstOutPath) {
    const relativePath = outPath.replace(firstOutPath, '');
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
