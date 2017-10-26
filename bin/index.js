/**
 * @Author: gyx
 * @Date: 2017-10-25
 */

'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var files = fs.readdirSync(path.resolve());
var whitelist = [
  '.git',
  '.gitignore',
  '.travis.yml',
  'README.md',
  'bin',
  'node_modules',
  'public'
];

files.forEach(function(filename) {
  if (whitelist.indexOf(filename) < 0) {
    exec('rm -rf ' + filename, function(err, stdout, stderr) {
      if (err) { console.log(err); return; }
    });
  }
});

exec('cp public/* ./', function(err, stdout, stderr) {
  if (err) {
    console.error(err);
    return;
  }
});
