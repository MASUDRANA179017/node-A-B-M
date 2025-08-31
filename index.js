const EventEmitter = require("events")
class Emitter extends EventEmitter {}

const MyEmitter = new Emitter();

MyEmitter.on("abc", () => {
  console.log("My Event is running");
});

MyEmitter.emit("abc");
