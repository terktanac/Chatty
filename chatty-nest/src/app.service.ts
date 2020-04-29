import { Injectable } from '@nestjs/common';
import { Timestamp } from 'mongodb';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// HEAD
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("pararell");
//   var query = { case: "2" };
//   dbo.collection("chatty").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parallel');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("OK")
});

// var kittySchema = new mongoose.Schema({
//   name: String
// });


var userSchema = new mongoose.Schema({
  userID : Number,
  name : String,
  avater : String
});

var chatroomSchema = new mongoose.Schema({
  roomID : Number,
  collectionOfMessage : String,
  createTime : Date
})


var messageSchema = new mongoose.Schema({
  messageID : Number,
  roomID : Number,
  text : String,
  createTime : Date,
  userJSON : JSON,
  status : Boolean
})

var userxchatroomSchema = new mongoose.Schema({
  userID : Number,
  roomID : Number,
  latestestUnreadTime : Date
});


// var Kitten = mongoose.model('Kitten', kittySchema);
var user = mongoose.model('User',userSchema)
var chatroom = mongoose.model('Chatroom',chatroomSchema)
var message = mongoose.model('Message',messageSchema)
var userXRoom = mongoose.model('UserXRoom',userxchatroomSchema)

//construtors

// var silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

// var owen = new user({userID:1,name:'Owen',avater:'test.png'})
// console.log(owen.name);

// var channel = new chatroom({roomID :1,collectionOfMessage : "String",createTime : Date()})
// console.log(channel.name);

// var chat = new message({messageID : 1,
//                         roomID : 1,    
//                         text : "String",
//                         createTime : Date(),
//                         userJSON : {roomID :1,collectionOfMessage : "String",createTime : Date()},
//                         status : true})
// console.log(chat.name);

var konXRoom = new userXRoom({userID : 1,
                            roomID : 1,
                            latestestUnreadTime : Date()
})



// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }

// var Kitten = mongoose.model('Kitten', kittySchema);

// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   // fluffy.speak();
// });

// owen.save(function (err, owen) {
//   if (err) return console.error(err);
// });
// channel.save(function (err, channel) {
//   if (err) return console.error(err);
// });
// chat.save(function (err, chat) {
//   if (err) return console.error(err);
// });
konXRoom.save(function (err, chat) {
  if (err) return console.error(err);
});

user.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

chatroom.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

message.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})



