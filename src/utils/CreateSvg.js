const fs = require('fs');
const path = require('path');
const prettier = require("prettier");
const SVGIcons2SVGFontStream =require('svgicons2svgfont');
module.exports = function CreateSvg(options){
  let startUnicode = 59905;
  let unicodes = {};
  let cache = [];
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontHeight: 1000,
      normalize: true,
      ...options.svgicons2svgfont,
      fontName: options.fontFamily,
    });
    const svgConfigPath = path.join(options.outputPath, "config.json")
    try {
      cache = JSON.parse(fs.readFileSync(svgConfigPath, {encoding: 'utf8'}));
      const iconUnicodes = cache.map(item => Number(item.id));
      startUnicode = Math.max(...iconUnicodes, startUnicode) + 1;
    } catch(err) {
      if(err.code === 'ENOENT') {
        console.log(`'${svgConfigPath}' not found, new code points will be generated`);
      } else {
        throw err;
      }
    }
    const dist_path = path.join(options.outputPath, 'index.svg')
    fontStream.pipe(fs.createWriteStream(dist_path))
      .on('finish', function () {
        console.log('svg font successfully created!');
        resolve(unicodes);
      })
      .on('error', function (err) {
        console.log(err);
        reject(err);
      });
    // 获取入口文件下的所有svg文件
    const filterSvgFiles = (svgPath) => {
      const files = fs.readdirSync(svgPath, 'utf-8');
      if (!files) {
        throw new Error(`svg folder is empty： ${svgPath}`);
      }
      const resArr = [];
      for(const i in files){
        // 如果不是svg文件，则继续循环
        if(typeof files[i] !== 'string' || path.extname(files[i]) !== '.svg') continue;
        if(!~resArr.indexOf(files[i])) {
          resArr.push(path.join(svgPath, files[i]));
        }
      }
      return resArr;
    }

    // 获取icon的unicode
    const getUnicode = (name) => {
      const iconUnicode = (cache.find(item => item.name === name) || {}).id;
      const code = iconUnicode ? Number(iconUnicode): startUnicode++;
      const unicode = String.fromCharCode(code);
      unicodes[name] = code;
      return [unicode];
    }
    filterSvgFiles(options.inputPath).forEach(svg => {
      if (typeof svg !== 'string') return false;
      const svg_name = path.basename(svg, '.svg');
      const glyph = fs.createReadStream(svg);
      glyph.metadata = {
        unicode: getUnicode(svg_name),
        name: svg_name,
      };
      fontStream.write(glyph);
    })

    // 生成config.json文件
    let fontStr = [];
    for(let key in unicodes) {
      const value =(unicodes[key]).toString(16);
      const iconStr =
      `{
        "id": "${unicodes[key]}",
        "unicode": "${value}",
        "name": "${key}",
        "fontClass": "${options.fontPrefix}${key}"
      }`
      fontStr.push(iconStr);
    }
    fontStr = `[${fontStr.join(",")}]`;
    const indexCss = path.join(options.outputPath, 'config.json')
    fontStr = prettier.format(fontStr, { parser: 'json' })
    fs.writeFile(indexCss, fontStr, {encoding: 'utf8'}, err => {
      if(err) throw err;
      console.log(`Wrote ${indexCss}`);
    });
    fontStream.end();
  })
}