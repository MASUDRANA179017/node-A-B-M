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
//     F_OK: 0,
//     R_OK: 4,
//     W_OK: 2,
//     X_OK: 1,
//     constants: [Object: null prototype] {
//       UV_FS_SYMLINK_DIR: 1,
//       UV_FS_SYMLINK_JUNCTION: 2,
//       O_RDONLY: 0,
//       O_WRONLY: 1,
//       O_RDWR: 2,
//       UV_DIRENT_UNKNOWN: 0,
//       UV_DIRENT_FILE: 1,
//       UV_DIRENT_DIR: 2,
//       UV_DIRENT_LINK: 3,
//       UV_DIRENT_FIFO: 4,
//       UV_DIRENT_SOCKET: 5,
//       UV_DIRENT_CHAR: 6,
//       UV_DIRENT_BLOCK: 7,
//       EXTENSIONLESS_FORMAT_JAVASCRIPT: 0,
//       EXTENSIONLESS_FORMAT_WASM: 1,
//       S_IFMT: 61440,
//       S_IFREG: 32768,
//       S_IFDIR: 16384,
//       S_IFCHR: 8192,
//       S_IFIFO: 4096,
//       S_IFLNK: 40960,
//       O_CREAT: 256,
//       O_EXCL: 1024,
//       UV_FS_O_FILEMAP: 536870912,
//       O_TRUNC: 512,
//       O_APPEND: 8,
//       S_IRUSR: 256,
//       S_IWUSR: 128,
//       F_OK: 0,
//       R_OK: 4,
//       W_OK: 2,
//       X_OK: 1,
//       UV_FS_COPYFILE_EXCL: 1,
//       COPYFILE_EXCL: 1,
//       UV_FS_COPYFILE_FICLONE: 2,
//       COPYFILE_FICLONE: 2,
//       UV_FS_COPYFILE_FICLONE_FORCE: 4,
//       COPYFILE_FICLONE_FORCE: 4
//     },
//     promises: [Getter]
//   }



//[class FileEmitter extends EventEmitter]
class FileEmitter extends EventEmitter {}

// console.log(fs);

// fileEmitter object constructor for FileEmitter
const fileEmitter = new FileEmitter();

const server = net.createServer((socket) => {
    console.log(server);
    
    console.log('Client connected.');

    const fileStream = fs.createReadStream('example.txt');
    let totalBytesSent = 0;


    fileStream.on('data', (chunk) => {
        totalBytesSent += chunk.length;
        console.log(`Sending chunk of size: ${chunk.length}`);
        fileEmitter.emit('chunkRead', chunk.length, totalBytesSent);
    });

    fileStream.pipe(socket);

    fileStream.on('end', () => {
        console.log('File transfer complete.');
        fileEmitter.emit('transferComplete', totalBytesSent);

        socket.write('File transfer complete!', () => {
            socket.end(); 
        });
    });

    fileStream.on('error', (err) => {
        console.error('File stream error:', err.message);
        socket.end(); 
    });

    socket.on('close', () => {
        console.log('Client disconnected.');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});


server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
