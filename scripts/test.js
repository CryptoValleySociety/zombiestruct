var exec = require('child_process').exec, child;

process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.NODE_ENV;

exec('nyc mocha --compilers js:babel-core/register --recursive test --timeout 60000',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
