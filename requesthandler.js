var url = require('url');

function handle(req, res) {
    var pathname = url.parse(req.url).pathname;

    //Get the route file for require
    //example of using try/catch
    try {
        //console.log("File to require: ./route" + pathname.toLowerCase().replace(new RegExp('/', 'g'), ''));
        var route = require("./route" + pathname.toLowerCase().replace(new RegExp('/', 'g'), ''));
    } catch (e) {
        console.log("requesthandler.handle: No route found for: " + "./route" + pathname.toLowerCase().replace(new RegExp('/', 'g'), ''));
        res.statusCode = 404;
        res.setHeader('content-type', 'text/plain');
        res.end('404 Not Found\n');
        return;
    }

    route.process(req, res);
}

exports.handle = handle;