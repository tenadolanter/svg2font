
const path = require('path');
const fs = require('fs');
const process =require('process');
const CreateSVG = require('./utils/CreateSvg.js');
const CreateTTF = require('./utils/CreateTtf.js');
const CreateEot = require('./utils/CreateEot.js');
const CreateWoff = require('./utils/CreateWoff.js');
const CreateWoff2 = require('./utils/CreateWoff2.js');
const CreateCss = require('./utils/CreateCss.js');
const CreateExample = require('./utils/CreateExample.js');
const defaultOptions = {
  src: path.join(process.cwd(), 'src/svgs'),
  dist: path.join(process.cwd(), 'lib'),
  cleanDist: true,
  config: path.join(process.cwd(), 'src/config.json'),
  fontName: 'iconfont',
  prefix: "icon-",
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
  example: true,
  ejs: path.join(process.cwd(), 'src/index.ejs'),
}
const fn = async (options = {}) => {
  const opts = {
    ...defaultOptions,
    ...options,
  }
  fs.rmdir(opts.dist, () => {});
  fs.mkdir(opts.dist, () => {});
  await CreateSVG(opts);
  const ttf = await CreateTTF(opts);
  await CreateEot(opts, ttf);
  await CreateWoff(opts, ttf);
  await CreateWoff2(opts, ttf);
  await CreateCss(opts);
  if(opts.example) {
    await CreateExample(opts);
  }
}
fn();