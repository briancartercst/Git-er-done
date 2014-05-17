var url = require('url');
var helper = require('./helpers');

function process(req, res) {
    console.log("route.process: start");

    var result =
        '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        helper.header() +
        '<p>Welcome to the Home Page</p>' +
        helper.footer() +
        '</body>' +
        '</html>';

    res.writeHead(200, {
        "Context-Type": "text/plain"
    });
    res.write(result);
    res.end();

    console.log("route.process: done");
}


exports.process = process;