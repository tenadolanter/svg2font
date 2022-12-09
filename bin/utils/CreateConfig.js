const path = require('path');
const fs = require('fs');
const endOfLine = require("os").EOL;
module.exports = function CreateConfig(options){
  return new Promise((resolve, reject) => {
    let codeMap = {};
    // get config
    try {
      codeMap = JSON.parse(fs.readFileSync(options.svgConfig, {encoding: 'utf8'}));
    } catch(err) {
      if(err.code === 'ENOENT') {
        console.log(`'${options.svgConfig}' not found, new code points will be generated`);
      } else {
        throw err;
      }
    }
    // generate css
    let fontStr = [];
    for(let key in codeMap) {
      const value =(codeMap[key])?.toString(16);
      const iconStr =
`${endOfLine}{
  "id": "${codeMap[key]}",
  "unicode": "${value}",
  "name": "${key}",
  "fontClass": "${options.fontPrefix}${key}"
}`
      fontStr.push(iconStr);
    }
    fontStr = `[${fontStr.join(",")}]`;
    const indexCss = path.join(options.outputPath, 'config.json')
    fs.writeFile(indexCss, fontStr, {encoding: 'utf8'}, err => {
      if(err) throw err;
      console.log(`Wrote ${indexCss}`);
      resolve();
    });
  });
}