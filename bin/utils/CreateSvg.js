const fs = require('fs');
const path = require('path');
const SVGIcons2SVGFontStream =require('svgicons2svgfont');
module.exports = function CreateSvg(options){
  let startUnicode = 59905;
  let unicodes = {};
  let cache = {};
  return new Promise((resolve, reject) => {
    const fontStream = new SVGIcons2SVGFontStream({
      fontHeight: 1000,
      normalize: true,
      ...options.svgicons2svgfont,
      fontName: options.fontFamily,
    });
    //  Setting the unicodes
    try {
      cache = JSON.parse(fs.readFileSync(options.svgConfig, {encoding: 'utf8'}));
      startUnicode = Math.max(...Object.values(cache).map(Number), startUnicode) + 1;
    } catch(err) {
      if(err.code === 'ENOENT') {
        console.log(`'${options.svgConfig}' not found, new code points will be generated`);
      } else {
        throw err;
      }
    }
    // Setting the font destination
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
    // get svgs
    const filterSvgFiles = (svgPath) => {
      const files = fs.readdirSync(svgPath, 'utf-8');
      if (!files) {
        throw new Error(`svg folder is empty： ${svgPath}`);
      }
      const resArr = [];
      for(const i in files){
        // if not a svg file, loop continue
        if(typeof files[i] !== 'string' || path.extname(files[i]) !== '.svg') continue;
        if(!~resArr.indexOf(files[i])) {
          resArr.push(path.join(svgPath, files[i]));
        }
      }
      return resArr;
    }
    // get icon unicode
    const getUnicode = (name) => {
      const code = cache[name] || startUnicode++;
      const unicode = String.fromCharCode(code);
      unicodes[name] = code;
      return [unicode];
    }
    filterSvgFiles(options.inputPath).forEach(svg => {
      if (typeof svg !== 'string') return false;
      // Writing glyphs
      const svg_name = path.basename(svg, '.svg');
      const glyph = fs.createReadStream(svg);
      glyph.metadata = {
        unicode: getUnicode(svg_name),
        name: svg_name,
      };
      fontStream.write(glyph);
    })
    fs.writeFile(options.svgConfig, JSON.stringify(unicodes, null, 4), {encoding: 'utf8'}, err => {
      if(err) throw err;
      console.log(`Wrote ${options.svgConfig}`);
    });
    // end the stream
    fontStream.end();
  })
}