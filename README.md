# Description [![build status](https://secure.travis-ci.org/curious-attempt-bunny/pachi.png)](http://next.travis-ci.org/curious-attempt-bunny/pachi)

A nodejs Go Text Protocol wrapper for the pachi Go engine.

# Usage

    var pachi = require('pachi');
    var gtp = pachi({book:true, playouts:5000, theads:4, pondering:false, maximize_score:true, debug:true});
    gtp.send('boardsize 19', function(error, response) {
      // ...
      gtp.exit(function() {
        // ...
      });
    });

# Installation

    npm install pachi

# More information

The above settings are explained in the [pachi README](http://repo.or.cz/w/pachi.git/blob/HEAD:/README).

# License

MIT
