const fs = require('fs');
const path = require('path');
const ttf2eot =require('ttf2eot');
module.exports = function CreateEot(options, ttf){
  return new Promise((resolve, reject) => {
    const dist_path = path.join(options.dist, 'index.eot');
    const eot = ttf2eot(ttf);
    const buffer = Buffer.from(eot.buffer);
    fs.writeFile(dist_path, buffer, (err)=> {
      if(err){
        return reject(err);
      }
      return resolve(eot);
    })
  })
}