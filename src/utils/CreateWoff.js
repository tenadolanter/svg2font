const fs = require('fs');
const path = require('path');
const ttf2woff =require('ttf2woff');
module.exports = function CreateWoff(options, ttf){
  return new Promise((resolve, reject) => {
    const dist_path = path.join(options.dist, 'index.woff');
    const woff = ttf2woff(ttf);
    const buffer = Buffer.from(woff.buffer);
    fs.writeFile(dist_path, buffer, (err)=> {
      if(err){
        return reject(err);
      }
      return resolve(woff);
    })
  })
}