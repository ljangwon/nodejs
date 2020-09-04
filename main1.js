var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {

        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          fs.rename( file, file.replace(/빌보드/i, "빌"), function(err) {
              if(err) console.log("ERROR: " + err);
          } );
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk("D:\\동영상작업", function(err, results) {
    if (err) throw err;
    console.log(results);
  });