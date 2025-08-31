// events = ঘটনা
// which refers to anything that happens

const EventEmitter = require("events")
class Emitter extends EventEmitter {}

const MyEmitter = new Emitter();

MyEmitter.on("abc", () => {
  console.log("My Event is running 1");
});
MyEmitter.on("abc", () => {
  console.log("My Event is running 2");
});
MyEmitter.on("abc", () => {
  console.log("My Event is running 3");
});
// its run only one time 
MyEmitter.once("abc", () => {
  console.log("My Event is running once");
});

// 2 time calls abc "emitter.on" call 
MyEmitter.emit("abc");
MyEmitter.emit("abc");

