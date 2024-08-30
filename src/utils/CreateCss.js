const path = require("path");
const fs = require("fs");
const prettier = require("prettier");
module.exports = function CreateCss(options) {
  return new Promise((resolve, reject) => {
    let svgConfigs = [];
    // 获取配置
    try {
      const scgConfigPath = path.join(options.outputPath, "config.json")
      svgConfigs = JSON.parse(
        fs.readFileSync(scgConfigPath, { encoding: "utf8" })
      );
    } catch (err) {
      throw err;
    }
    // 生成css
    let fontStr = `@font-face {
      font-family: "${options.fontFamily}";
      src: url('index.woff2?t=${new Date().getTime()}') format('woff2'),
          url('index.woff?t=${new Date().getTime()}') format('woff'),
          url('index.eot?t=${new Date().getTime()}') format('embedded-opentype'),
          url('index.ttf?t=${new Date().getTime()}') format('truetype'),
          url('index.svg?t=${new Date().getTime()}') format('svg');
    }
    [class*=" ${options.fontPrefix}"],[class^=${options.fontPrefix}] {
      font-family: "${options.fontFamily}" !important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }`;
    for (let item of svgConfigs) {
      const value = item.unicode;
      const key = item.fontClass;
      const iconStr = `.${key}:before {
        content: "\\0${value}";
      }`;
      fontStr = fontStr + iconStr;
    }
    fontStr = prettier.format(fontStr, { parser: "css" });
    const indexCss = path.join(options.outputPath, "index.min.css");
    fs.writeFile(indexCss, fontStr, { encoding: "utf8" }, (err) => {
      if (err) throw err;
      console.log(`生成 ${indexCss} 成功~~~`);
      resolve();
    });
  });
};
