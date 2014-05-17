var url = require('url');
var helper = require('./helpers');

function process(req, res) {
    console.log("routeblock.process: start");

    var result =
        '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        helper.header() +
        '<p>Block Page</p>' +
        '<p>This page blocks for 10 seconds</p>'
    helper.footer() +
        '</body>' +
        '</html>';

    var stop = new Date().getTime();
    while (new Date().getTime() < stop + 10000) {;
    }

    res.writeHead(200, {
        "Context-Type": "text/plain"
    });
    res.write(result);
    res.end();

    console.log("routeblock.process: done");
}


exports.process = process;