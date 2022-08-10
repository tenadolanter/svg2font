const fs = require('fs');
const path = require('path');
const ttf2woff2 =require('ttf2woff2');
module.exports = function CreateWoff(options, ttf){
  return new Promise((resolve, reject) => {
    const dist_path = path.join(options.dist, 'index.woff2');
    const woff2 = ttf2woff2(ttf);
    const buffer = Buffer.from(woff2.buffer);
    fs.writeFile(dist_path, buffer, (err)=> {
      if(err){
        return reject(err);
      }
      return resolve(woff2);
    })
  })
}