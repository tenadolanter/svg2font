const path = require('path');
const fs = require('fs');
const PACKAGE_JSON = require("../package.json");
const generateFont = require("./util.js")
module.exports = function generateProgram(program){
  program
  .name(PACKAGE_JSON.name)
  .description(PACKAGE_JSON.description, {
    INPUT: 'Alias to --input',
  })
  .version(PACKAGE_JSON.version, '-v, --version')
  .arguments('[INPUT]')
  .option( '-o, --options <OPTIONS>', 'config of svg2font' )
  .action(action);
}

async function action(args, opts, command){
  let options = {};
  const _path = path.join(process.cwd(), opts.options);
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
}