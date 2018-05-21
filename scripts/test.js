var exec = require('child_process').exec, child;

process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.NODE_ENV;

exec('mocha --compilers js:babel-core/register --recursive test',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
