
const net = require('net');
const fs = require('fs');


const PORT = 8000;
const HOST = 'localhost';

// net give some object of methods
    // {
    //     _createServerHandle: [Function: createServerHandle],
    //     _normalizeArgs: [Function: normalizeArgs],
    //     _setSimultaneousAccepts: [Function: _setSimultaneousAccepts],
    //     BlockList: [Getter],
    //     SocketAddress: [Getter],
    //     connect: [Function: connect],
    //     createConnection: [Function: connect],
    //     createServer: [Function: createServer],
    //     isIP: [Function: isIP],
    //     isIPv4: [Function: isIPv4],
    //     isIPv6: [Function: isIPv6],
    //     Server: [Function: Server],
    //     Socket: [Function: Socket],
    //     Stream: [Function: Socket],
    //     getDefaultAutoSelectFamily: [Function: getDefaultAutoSelectFamily],
    //     setDefaultAutoSelectFamily: [Function: setDefaultAutoSelectFamily],
    //     getDefaultAutoSelectFamilyAttemptTimeout: [Function: getDefaultAutoSelectFamilyAttemptTimeout],
    //     setDefaultAutoSelectFamilyAttemptTimeout: [Function: setDefaultAutoSelectFamilyAttemptTimeout]
    //   }




const outputFile = fs.createWriteStream('received_example.txt');

// function createConnection(options: net.NetConnectOpts, connectionListener?: () => void): net.Socket (+2 overloads)
// A factory function, which creates a new Socket, immediately initiates connection with socket.connect(), then returns the net.Socket that starts the connection.

// When the connection is established, a 'connect' event will be emitted on the returned socket. The last parameter connectListener, if supplied, will be added as a listener for the 'connect' event once.

// Possible signatures:
// createConnection
// createConnection for IPC connections.
// createConnection for TCP connections.
const client = net.createConnection({ port: PORT, host: HOST }, () => {
    console.log('Connected to server.');
});




// Socket Events methods for IPC connections and TCP connections that are created
    // (method) Socket.on(event: "end", listener: () => void): net.Socket (+12 overloads)
    // Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

    // server.on('connection', (stream) => {
    //   console.log('someone connected!');
    // });
    // Returns a reference to the EventEmitter, so that calls can be chained.

    // By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.



client.on('data', (data) => {
    outputFile.write(data);
    console.log('Writing data to file...');
});


client.on('end', () => {
    console.log('Disconnected from server. File transfer complete.');
    outputFile.end();
});


client.on('error', (err) => {
    console.error('Error:', err.message);
    outputFile.end();
});