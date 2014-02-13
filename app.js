var express = require('express'),
    app = express();

// middleware before routes
app.configure(function() {

  // do application-level gzip compression if requested
  if (process.env.GZIP == "on")
      app.use(express.compress());

  // favicon, important stuff
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});

// Heartbeat
app.get('/', function(req, res) {res.send("I'm alive!");});







/***** SERVER BOOT ******/

var port = parseInt(process.env.PORT || 8000);

var startServer = function() {
    app.enable('trust proxy');

    app.listen(port, function() {
        console.log("Express %s server listening on port %s", app.settings.env, port);
    });
}

// auto-reload files in development
app.configure('development', function() {
    app.use(express.errorHandler());
    require('reloader')({watchModules: true, onReload: startServer});
});

app.configure('production', startServer);