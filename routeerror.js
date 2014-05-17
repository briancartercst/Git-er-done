var url = require('url');
var helper = require('./helpers');

function process(req, res) {
    console.log("routeerror.process: start");

    throw new Error('Test Error');

    res.writeHead(200, {
        "Context-Type": "text/plain"
    });
    res.write(result);
    res.end();

    console.log("routeerror.process: done");
}


exports.process = process;