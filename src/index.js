const generateFont = require('../bin/util.js');
const path = require('path');
const fs = require('fs');
let options = {};
const _path = path.join(process.cwd(), 'src/options.json');
try {
  options = JSON.parse(fs.readFileSync(_path, {encoding: 'utf8'}));
} catch(err) {
  if(err.code === 'ENOENT') {
    console.log(`'${_path}' not found`);
  } else {
    throw err;
  }
}
generateFont(options);