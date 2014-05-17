// This supports Clusters and Domains
//

var cluster = require('cluster');
var requestHandler = require('./requesthandler');
var helpers = require('./helpers');

var PORT = +process.env.PORT || 1337;

if (cluster.isMaster) {
    // Use just 2 workers.  If you have multiple CPUs,
    // increase the number of forks.
    //
    // See the options in the cluster documentation.
    //
    // The important thing is that the master does very little,
    // increasing our resilience to unexpected errors.

    console.log('Application Starting - Master');
    
    cluster.fork();
    cluster.fork();

    cluster.on('disconnect', function (worker) {
        console.error('Disconnect worker on port ' + PORT + '!');
        cluster.fork();
    });

} else {
    // the worker
    var domain = require('domain');

    var server = require('http').createServer(function (req, res) {
        var d = domain.create();
        d.on('error', function (er) {
            console.error('error: ', er.stack);

            // Note: uncaught error has occurred!
            // By definition, something unexpected occurred,
            // which we probably didn't want.

            try {
                // make sure we close down within 30 seconds
                var killtimer = setTimeout(function () {
                    process.exit(1);
                }, 30000);
                // But don't keep the process open just for that!
                killtimer.unref();

                // stop taking new requests.
                server.close();

                // Let the master know we're dead.  This will trigger a
                // 'disconnect' in the cluster master, and then it will fork
                // a new worker.
                cluster.worker.disconnect();
                
                // create the error
                var errorMessage = Error.http(500, null, er.stack);
                
                // try to send an error to the request that triggered the problem
                res.writeHead(500, {
                    "Context-Type": "text/plain"
                });
                res.write(errorMessage.status + ': ' + errorMessage.message + '\n' + errorMessage.data);
                res.end();                
            } catch (er2) {
                // oh well, not much we can do at this point.
                console.error('Error sending 500!', er2.stack);
            }
        });

        // Because req and res were created before this domain existed,
        // we need to explicitly add them.
        // See the explanation of implicit vs explicit binding below.
        d.add(req);
        d.add(res);

        // Now run the handler function in the domain.
        d.run(function () {
            requestHandler.handle(req, res);
        });
    });
    server.listen(PORT);
    console.log('Starting worker - listening on port: ' + PORT);
}

