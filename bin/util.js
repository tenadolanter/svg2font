const fs = require('fs');
const CreateSVG = require('./utils/CreateSvg.js');
const CreateTTF = require('./utils/CreateTtf.js');
const CreateEot = require('./utils/CreateEot.js');
const CreateWoff = require('./utils/CreateWoff.js');
const CreateWoff2 = require('./utils/CreateWoff2.js');
const CreateCss = require('./utils/CreateCss.js');
const CreateConfig = require('./utils/CreateConfig.js');
const CreateExample = require('./utils/CreateExample.js');
const defaultOptions = {
  cleanDist: true,
  fontFamily: 'tenado-icons',
  fontPrefix: "te-icon-",
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
}
const fn = async (options = {}) => {
  const opts = {
    ...defaultOptions,
    ...options,
  }
  fs.rmdir(opts.outputPath, () => {});
  fs.mkdir(opts.outputPath, () => {});
  await CreateSVG(opts);
  const ttf = await CreateTTF(opts);
  await CreateEot(opts, ttf);
  await CreateWoff(opts, ttf);
  await CreateWoff2(opts, ttf);
  await CreateCss(opts);
  await CreateConfig(opts);
  if(opts.example) {
    await CreateExample(opts);
  }
}

module.exports = fn;