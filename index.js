var spawn = require('child_process').spawn;
var path  = require('path');

module.exports = function(options) {
  var args = [];
  if (options && options.book) {
    args.push('-f');
    args.push(path.join(__dirname, 'pachi-805abb4', 'book.dat'));
  }
  args.push('-t');
  args.push('='+((options && options.playouts) || 2000)); 
  var extendedOptions = [];
  if (!(options && options.pondering == false)) {
    extendedOptions.push('pondering=0');
  }
  if (options && options.threads) {
    extendedOptions.push('threads='+options.threads);
  }
  if (!(options && options.maximize_score == false)) {
    extendedOptions.push('maximize_score');
  }
  args.push(extendedOptions.join(','));

  var gtp = spawn(path.join(__dirname, 'pachi-805abb4', 'pachi'), args);
  var callback = null;
  var debug = options && options.debug;

  gtp.stdout.on('data', function (data) {
    if (debug) {
      console.log(data.toString());
    }
    var response = /= ((?:.|\n)*)/g.exec(data);
    if (callback && response) {
      callback(null, response[1].trim());
    } else {
      var error = /\? ((?:.|\n)*)/g.exec(data);
      if (callback && error) {
        callback(error, null);
      } else {
        console.error("Unexpected stdout: "+data);
      }
    }
  });

  gtp.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  gtp.on('close', function (code) {
    console.log('child process exited with code ' + code);
  }); 

  return {
    send: function(command, next) {
      callback = next;
      gtp.stdin.write(command+"\n");
    },
  
    exit: function(command, next) {
      gtp.stdin.end();
      if (next) {
        next();
      }
    }
  };
};
