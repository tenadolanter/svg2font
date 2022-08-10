const fs = require('fs');
const path = require('path');
const svg2ttf =require('svg2ttf');
module.exports = function CreateTtf(options){
  return new Promise((resolve, reject) => {
    const FILES = path.join(options.dist, 'index.svg')
    const ttf = svg2ttf(fs.readFileSync(FILES, 'utf8'), {})
    const buffer = Buffer.from(ttf.buffer);
    const dist_path = path.join(options.dist, 'index.ttf');
    fs.writeFile(dist_path, buffer, (err) => {
      if(err){
        return reject(err);
      }
      return resolve(buffer);
    })
  })
}