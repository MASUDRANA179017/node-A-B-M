const net = require('net');
const fs = require('fs');
const EventEmitter = require('events');

const PORT = 8000;
const HOST = 'localhost';

//give some methods to fs net and EventEmitter so that is able to
//  <ref *1> [Function: EventEmitter] {
//   addAbortListener: [Function: addAbortListener],
//   once: [AsyncFunction: once],
//   on: [Function: on],
//   getEventListeners: [Function: getEventListeners],
//   getMaxListeners: [Function: getMaxListeners],
//   EventEmitter: [Circular *1],
//   usingDomains: false,
//   captureRejectionSymbol: Symbol(nodejs.rejection),
//   captureRejections: [Getter/Setter],
//   EventEmitterAsyncResource: [Getter],
//   errorMonitor: Symbol(events.errorMonitor),
//   defaultMaxListeners: [Getter/Setter],
//   setMaxListeners: [Function (anonymous)],
//   init: [Function (anonymous)],
//   listenerCount: [Function (anonymous)]
// }
//console.log(EventEmitter);


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


//fs give some object of methods that

// {
//     appendFile: [Function: appendFile],
//     appendFileSync: [Function: appendFileSync],
//     access: [Function: access],
//     accessSync: [Function: accessSync],
//     chown: [Function: chown],
//     chownSync: [Function: chownSync],
//     chmod: [Function: chmod],
//     chmodSync: [Function: chmodSync],
//     close: [Function: close],
//     closeSync: [Function: closeSync],
//     copyFile: [Function: copyFile],
//     copyFileSync: [Function: copyFileSync],
//     cp: [Function: cp],
//     cpSync: [Function: cpSync],
//     createReadStream: [Function: createReadStream],
//     createWriteStream: [Function: createWriteStream],
//     exists: [Function: exists],
//     existsSync: [Function: existsSync],
//     fchown: [Function: fchown],
//     fchownSync: [Function: fchownSync],
//     fchmod: [Function: fchmod],
//     fchmodSync: [Function: fchmodSync],
//     fdatasync: [Function: fdatasync],
//     fdatasyncSync: [Function: fdatasyncSync],
//     fstat: [Function: fstat],
//     fstatSync: [Function: fstatSync],
//     fsync: [Function: fsync],
//     fsyncSync: [Function: fsyncSync],
//     ftruncate: [Function: ftruncate],
//     ftruncateSync: [Function: ftruncateSync],
//     futimes: [Function: futimes],
//     futimesSync: [Function: futimesSync],
//     lchown: [Function: lchown],
//     lchownSync: [Function: lchownSync],
//     lchmod: undefined,
//     lchmodSync: undefined,
//     link: [Function: link],
//     linkSync: [Function: linkSync],
//     lstat: [Function: lstat],
//     lstatSync: [Function: lstatSync],
//     lutimes: [Function: lutimes],
//     lutimesSync: [Function: lutimesSync],
//     mkdir: [Function: mkdir],
//     mkdirSync: [Function: mkdirSync],
//     mkdtemp: [Function: mkdtemp],
//     mkdtempSync: [Function: mkdtempSync],
//     open: [Function: open],
//     openSync: [Function: openSync],
//     openAsBlob: [Function: openAsBlob],
//     readdir: [Function: readdir],
//     readdirSync: [Function: readdirSync],
//     read: [Function: read],
//     readSync: [Function: readSync],
//     readv: [Function: readv],
//     readvSync: [Function: readvSync],
//     readFile: [Function: readFile],
//     readFileSync: [Function: readFileSync],
//     readlink: [Function: readlink],
//     readlinkSync: [Function: readlinkSync],
//     realpath: [Function: realpath] { native: [Function (anonymous)] },
//     realpathSync: [Function: realpathSync] { native: [Function (anonymous)] },
//     rename: [Function: rename],
//     renameSync: [Function: renameSync],
//     rm: [Function: rm],
//     rmSync: [Function: rmSync],
//     rmdir: [Function: rmdir],
//     rmdirSync: [Function: rmdirSync],
//     stat: [Function: stat],
//     statfs: [Function: statfs],
//     statSync: [Function: statSync],
//     statfsSync: [Function: statfsSync],
//     symlink: [Function: symlink],
//     symlinkSync: [Function: symlinkSync],
//     truncate: [Function: truncate],
//     truncateSync: [Function: truncateSync],
//     unwatchFile: [Function: unwatchFile],
//     unlink: [Function: unlink],
//     unlinkSync: [Function: unlinkSync],
//     utimes: [Function: utimes],
//     utimesSync: [Function: utimesSync],
//     watch: [Function: watch],
//     watchFile: [Function: watchFile],
//     writeFile: [Function: writeFile],
//     writeFileSync: [Function: writeFileSync],
//     write: [Function: write],
//     writeSync: [Function: writeSync],
//     writev: [Function: writev],
//     writevSync: [Function: writevSync],
//     Dirent: [class Dirent],
//     Stats: [Function: Stats],
//     ReadStream: [Getter/Setter],
//     WriteStream: [Getter/Setter],
//     FileReadStream: [Getter/Setter],
//     FileWriteStream: [Getter/Setter],
//     _toUnixTimestamp: [Function: toUnixTimestamp],
//     Dir: [Getter/Setter],
//     opendir: [Getter/Setter],
//     opendirSync: [Getter/Setter],
//    
//     promises: [Getter]
//   }



//[class FileEmitter extends EventEmitter]
class FileEmitter extends EventEmitter {}

// console.log(fs);

// fileEmitter object constructor for FileEmitter
const fileEmitter = new FileEmitter();

// function createServer(connectionListener?: (socket: net.Socket) => void): net.Server (+1 overload)
// Creates a new TCP or IPC server.

// If allowHalfOpen is set to true, when the other end of the socket signals the end of transmission, the server will only send back the end of transmission when socket.end() is explicitly called. For example, in the context of TCP, when a FIN packed is received, a FIN packed is sent back only when socket.end() is explicitly called. Until then the connection is half-closed (non-readable but still writable). See 'end' event and RFC 1122 (section 4.2.2.13) for more information.

// If pauseOnConnect is set to true, then the socket associated with each incoming connection will be paused, and no data will be read from its handle. This allows connections to be passed between processes without any data being read by the original process. To begin reading data from a paused socket, call socket.resume().

// The server can be a TCP server or an IPC server, depending on what it listen() to. Here is an example of a TCP echo server which listens for connections on port 8124:
// import net from 'node:net';
// const server = net.createServer((c) => {
//   // 'connection' listener.
//   console.log('client connected');
//   c.on('end', () => {
//     console.log('client disconnected');
//   });
//   c.write('hello\r\n');
//   c.pipe(c);
// });
// server.on('error', (err) => {
//   throw err;
// });
// server.listen(8124, () => {
//   console.log('server bound');
// });
// Test this by using telnet:
// telnet localhost 8124
// To listen on the socket /tmp/echo.sock:
// server.listen('/tmp/echo.sock', () => {
//   console.log('server bound');
// });
// Use nc to connect to a Unix domain socket server:
// nc -U /tmp/echo.sock
// @since — v0.5.0
// @param connectionListener — Automatically set as a listener for the 'connection' event.

// console.log("T: This is a server");

// A server is created using net.createServer. It listens for client connections (e.g., programs trying to connect to it).

const server = net.createServer((socket) => {
    console.log("this is server for under socket" + server);
    
    //console.log('Client connected.');


    // fs createreadStream method make data flow with packet format 
    const fileStream = fs.createReadStream('example.txt');
    let totalBytesSent = 0;

    // on connect make data flow with packet format to send packets to the server socket in chunk by chunk size
    fileStream.on('data', (chunk) => {
        // total size of the packet in stored totalBytesSent variable
        totalBytesSent += chunk.length;

        // Send the chunk to the client socket in chunk by chunk size and send the packet to the server socket
        console.log(`Sending chunk of size: ${chunk.length}`);
        // fs emit event fileEmitter.emit is triggered (presumably to notify other parts of the app) packet to server socket and send the packet to the server socket in chunk by chunk size
        fileEmitter.emit('chunkRead', chunk.length, totalBytesSent);
    });

    // Sending Data to Client:
    fileStream.pipe(socket);

    // When the file transfer is complete or End of File Transfer or When the file is fully sent: A "File transfer complete." message is logged and sent to the client. The connection to the client is closed.

    fileStream.on('end', () => {
        console.log('File transfer complete.');
        fileEmitter.emit('transferComplete', totalBytesSent);

        // Send the completion message to the client socket. When the message is sent, the connection to the client is closed.
        socket.write('File transfer complete!', () => {
            socket.end(); 
        });
    });


    console.log("ok NO MORE TO DAY");
    


    // Error handling: If there is an error while reading the file or while sending the data to the client: An error message is logged and the connection to the client is closed.
    fileStream.on('error', (err) => {
        console.error('File stream error:', err.message);
        socket.end(); 
    });

    // When the client disconnects: A "Client disconnected." message is logged and the connection to the client is closed.
    socket.on('close', () => {
        console.log('Client disconnected.');
    });

    // it recheck for socket error on this server client connection  
    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});


//This method is used to start the server and make it listen on a specific PORT and HOST.
server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
