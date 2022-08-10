const path = require('path');
const fs = require('fs');
const endOfLine = require("os").EOL;
module.exports = function CreateCss(options){
  return new Promise((resolve, reject) => {
    let codeMap = {};
    // get config
    try {
      codeMap = JSON.parse(fs.readFileSync(options.config, {encoding: 'utf8'}));
    } catch(err) {
      if(err.code === 'ENOENT') {
        console.log(`'${options.config}' not found, new code points will be generated`);
      } else {
        throw err;
      }
    }
    // generate css
    let fontStr =
`@font-face {
  font-family: "${options.fontName}";
  src: url('index.woff2?t=${new Date().getTime()}') format('woff2'),
      url('index.woff?t=${new Date().getTime()}') format('woff'),
      url('index.eot?t=${new Date().getTime()}') format('embedded-opentype'),
      url('index.ttf?t=${new Date().getTime()}') format('truetype'),
      url('index.svg?t=${new Date().getTime()}') format('svg');
}
[class*=" ${options.prefix}"],[class^=${options.prefix}] {
  font-family: "${options.fontName}" !important;
  speak: none;
  font-size: 1em;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`
    for(let key in codeMap) {
      const value =(codeMap[key])?.toString(16);
      const iconStr =
`${endOfLine}.${options.prefix}${key}:before {
  content: "\\0${value}";
}`
      fontStr = fontStr + iconStr;
    }
    const indexCss = path.join(options.dist, 'index.min.css')
    fs.writeFile(indexCss, fontStr, {encoding: 'utf8'}, err => {
      if(err) throw err;
      console.log(`Wrote ${indexCss}`);
      resolve();
    });
  });
}