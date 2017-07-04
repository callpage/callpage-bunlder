const fs = require('fs');
const isConfig = fs.existsSync(process.cwd() + '/config.js');


if (!isConfig) {
    console.log('\x1b[36m%s\x1b[0m: ', 'File \'config.js\' doesn\'t exists in current directory', process.cwd());
} else {
    var callpageAPI = require(process.cwd() + '/config.js');
}

require('./validator.js')(callpageAPI)

if (!fs.existsSync(process.cwd() + '/.eslintrc.js')) {
    fs.writeFileSync('.eslintrc.js', require('./esLintConfiguration.js')(callpageAPI), 'utf-8');
} else {
    throw new Error('.eslintrc.js exists')
}

if(!fs.existsSync(process.cwd() + '/webpack.config.js')) {
    fs.writeFileSync('webpack.config.js', require('./webpackConfiguration.js')(callpageAPI), 'utf-8')
} else {
    throw new Error('webpack.config.js exists')
}
