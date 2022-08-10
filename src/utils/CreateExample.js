const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const outPath = path.join(process.cwd(), 'example/index.html')
module.exports = function CreateExample(options){
  // 获取所有icon列表
  let codeMap = {};
  try {
    codeMap = JSON.parse(fs.readFileSync(options.config, {encoding: 'utf8'}));
  } catch(err) {
    if(err.code === 'ENOENT') {
      console.log(`'${options.config}' not found, new code points will be generated`);
    } else {
      throw err;
    }
  }
  // 生成example
  ejs.renderFile(options.ejs, { icons: Object.keys(codeMap), options: options }, {}, function(err, str){
      // str => 输出渲染后的 HTML 字符串
      fs.writeFile(outPath, str, {encoding: 'utf8'}, err => {
        if(err) throw err;
        console.log(`Wrote ${outPath}`);
      });
  });
}