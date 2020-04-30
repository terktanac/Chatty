import { Injectable } from '@nestjs/common';
import { Timestamp } from 'mongodb';
import { async } from 'rxjs/internal/scheduler/async';
import { promises } from 'dns';

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
mongoose.connect('mongodb://localhost:27017/parallel1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("OK")
});

// var userSchema = new mongoose.Schema({
//   userID : Number,
//   name : String,
//   avater : String
// });

// var chatroomSchema = new mongoose.Schema({
//   roomID : Number,
//   collectionOfMessage : String,
//   createTime : Date
// })

var userSchema = new mongoose.Schema({
  userID : String,
  name : String,
  avater : String
});

var chatroomSchema = new mongoose.Schema({
  roomID : String,
  collectionOfMessage : String,
  createTime : Date
})


var messageSchema = new mongoose.Schema({
  messageID : String,
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
var userDB = mongoose.model('User',userSchema)
var chatroomDB = mongoose.model('Chatroom',chatroomSchema)
var messageDB = mongoose.model('Message',messageSchema)
var userXRoomDB = mongoose.model('UserXRoom',userxchatroomSchema)
// var messageSchema = new mongoose.Schema({
//   messageID : Number,
//   roomID : Number,
//   text : String,
//   createTime : Date,
//   userJSON : JSON,
//   status : Boolean
// })

// var userxchatroomSchema = new mongoose.Schema({
//   userID : Number,
//   roomID : Number,
//   latestestUnreadTime : Date
// });


// // var Kitten = mongoose.model('Kitten', kittySchema);
// var user = mongoose.model('User',userSchema)
// var chatroom = mongoose.model('Chatroom',chatroomSchema)
// var message = mongoose.model('Message',messageSchema)
// var userXRoom = mongoose.model('UserXRoom',userxchatroomSchema)

// //construtors

// // var silence = new Kitten({ name: 'Silence' });
// // console.log(silence.name); // 'Silence'

// // var owen = new user({userID:1,name:'Owen',avater:'test.png'})
// // console.log(owen.name);

// // var channel = new chatroom({roomID :1,collectionOfMessage : "String",createTime : Date()})
// // console.log(channel.name);

// // var chat = new message({messageID : 1,
// //                         roomID : 1,    
// //                         text : "String",
// //                         createTime : Date(),
// //                         userJSON : {roomID :1,collectionOfMessage : "String",createTime : Date()},
// //                         status : true})
// // console.log(chat.name);

// var konXRoom = new userXRoom({userID : 1,
//                             roomID : 1,
//                             latestestUnreadTime : Date()
// })

// var konXRoom = new userXRoom({userID : 1,
//                             roomID : 1,
//                             latestestUnreadTime : Date()
// })

// var konXRoom1 = new userXRoom({userID : 1,
//   roomID : 2,
//   latestestUnreadTime : Date()
// })
// var konXRoom2 = new userXRoom({userID : 1,
//   roomID : 2,
//   latestestUnreadTime : Date()
// })

// var konXRoom3 = new userXRoom({userID : 2,
//   roomID : 2,
//   latestestUnreadTime : Date()
// })

// // // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// // kittySchema.methods.speak = function () {
// //   var greeting = this.name
// //     ? "Meow name is " + this.name
// //     : "I don't have a name";
// //   console.log(greeting);
// // }

// // var Kitten = mongoose.model('Kitten', kittySchema);

// // var fluffy = new Kitten({ name: 'fluffy' });
// // fluffy.speak(); // "Meow name is fluffy"

// // fluffy.save(function (err, fluffy) {
// //   if (err) return console.error(err);
// //   // fluffy.speak();
// // });

// // owen.save(function (err, owen) {
// //   if (err) return console.error(err);
// // });
// // channel.save(function (err, channel) {
// //   if (err) return console.error(err);
// // });
// // chat.save(function (err, chat) {
// //   if (err) return console.error(err);
// // });
// konXRoom.save(function (err, chat) {
//   if (err) return console.error(err);
// });

// user.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

// chatroom.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

// message.find(function (err, kittens) {
//   if (err) return console.error(err);
// });
// konXRoom.save(function (err, konXRoom) {
//   if (err) return console.error(err);
//   console.log(konXRoom)
// });
// konXRoom1.save(function (err, konXRoom1) {
//   if (err) return console.error(err);
//   console.log(konXRoom)
// });
// konXRoom2.save(function (err, konXRoom2) {
//   if (err) return console.error(err);
//   console.log(konXRoom)
// });
// konXRoom3.save(function (err, konXRoom3) {
//   if (err) return console.error(err);
//   console.log(konXRoom)
// });


//find
// user.find(function (err, User) {
//   if (err) return console.error(err);
//   console.log(User);
//   User.forEach(user => {
//     console.log(typeof(user._id))
//     console.log("ID:",user._id)
//   });
  
// })


// chatroom.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

// message.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })
// var i = 2
// var j = 2
// userXRoom.find({roomID:i}, function (err, para) {
//   if(err) return console.error(err)
//   console.log(para)
// });

// async findByuserID(userId){
//   var test =[]
//   user.forEach(element => {
//     if(element)
//   });
//   await return this.user
// }


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

//wait client data
wss.on('connection', function connection(ws) {
  ws.on('message',function(message) {
    var chat = JSON.parse(message)
    //console.log(chat)
    if (chat.type == 'initial')  {
      ws.username = chat.data.user.name
      //ws.channel = chat.data.channel
    }

    if (chat.type == 'message') {
      //message = `${ws.username} : ${chat.data}`
      //message = chat.data
      // console.log(chat.data[0])
      var test = new messageDB({messageID : chat.data[0].user.id,
                              roomID : 5,    
                              text : chat.data[0].text,
                              createTime : chat.data[0].createdAt,
                              userJSON : {roomID :1,collectionOfMessage : "String",createTime : Date()},
                              status : true})
      console.log(test)
      test.save(function (err, chat) {
        if (err) return console.error(err);
      });
      console.log(chat.data[0].user.joinedChannel)
      let sendData = {
        "type":"message",
        "data": chat.data
      }
      wss.clients.forEach(element => {
        //if (element.channel == ws.channel) element.send(message)
        element.send(JSON.stringify(sendData))
      });
    }

    if (chat.type == 'changeChannel') {
      if (ws.channel != chat.data) {
        wss.clients.forEach(element => {
          if (element.channel == ws.channel) element.send(`${ws.username} leaved`)
          if (element.channel == chat.data) element.send(`${ws.username} joined`)
        });
        ws.channel = chat.data
      }
      
    }

    if (chat.type == 'debug') {
      console.log(chat)

    }
    
    //console.log(ws)
    console.log("----------------------------------------")
    //console.log(wss.clients)
  
    //storee
  })



  ws.on('close', function () {
    console.log("lost"+ws.username)
  })
  
});

