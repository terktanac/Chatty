import { Injectable } from '@nestjs/common';
import { Timestamp } from 'mongodb';
import { async } from 'rxjs/internal/scheduler/async';
import { promises, resolveSrv } from 'dns';

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
  name : String,
  avater : String,
  joinedChannel : Array
});

var chatroomSchema = new mongoose.Schema({
  roomID : String,
  collectionOfMessage : String,
  createTime : Date
})


var messageSchema = new mongoose.Schema({
  messageID : String,
  roomID : String,
  text : String,
  createTime : Date,
  userJSON : JSON,
  status : Boolean
})

var userxchatroomSchema = new mongoose.Schema({
  userID : String,
  roomID : String,
  latestestUnreadTime : Date,
  
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
      console.log(`initial ${chat.data.username}`)
      ws.username = chat.data.username
      ws.channel = ''
      //ws.channel = chat.data.channel
      userDB.find({name:ws.username},function (err, result) {
        if (err) return console.error(err);
         if (result.length != 0) {
         console.log("result",result[0].joinedChannel)
         let sendData = {
           "type":"initial",
           "data":result[0].joinedChannel
         }
        ws.send(JSON.stringify(sendData))
         }
      })
    }

    if (chat.type == 'message') {
      //message = `${ws.username} : ${chat.data}`
      //message = chat.data
      // console.log(chat.data[0])
      console.log("chat.data[0]",chat.data[0])
      console.log("joinedChannel", chat.data[0].user.joinedChannel)
      let joined = chat.data[0].user.joinedChannel
      let uName = chat.data[0].user.name
      userDB.find({name:uName},function (err, result) {
        if (err) return console.error(err);
        console.log("res",result)
        if (result.length == 0) {
          let userJoined = new userDB({
            name:uName,
            joinedChannel:joined
          })
          userJoined.save(function (err, chat) {
            if (err) return console.error(err);
          });
        }
        else {
          //console.log("overwrite",result[0]['_id'])
          //userDB.deleteOne({_id:result[0]['_id']})
          result[0].remove()
          let userJoined = new userDB({
            name:uName,
            joinedChannel:joined
          })
          userJoined.save(function (err, chat) {
            if (err) return console.error(err);
          });
        }
      
      })
      var test = new messageDB({messageID : chat.data[0].id,
                              roomID : chat.data[0].channelName,    
                              text : chat.data[0].text,
                              createTime : chat.data[0].createdAt,
                              userJSON : {roomID :chat.data[0].channelName,collectionOfMessage : chat.data[0].user,createTime : Date()},
                              status : chat.data[0].status})
      // console.log(test)
      test.save(function (err, chat) {
        if (err) return console.error(err);
      });
      // console.log(chat.data[0])
      let sendData = {
        "type":"message",
        "data": chat.data
      }

      wss.clients.forEach(element => {
        if (element.channel == ws.channel && element.channel) element.send(JSON.stringify(sendData))
        //element.send(message) 
        
      });
    }

    if (chat.type == 'changeChannel') {
      
      ws.channel = chat.data
        console.log(`${ws.username} change channel to ${chat.data}`)
        // wss.clients.forEach(element => {
        //   if (element.channel == ws.channel) element.send(`${ws.username} leaved`)
        //   if (element.channel == chat.data) element.send(`${ws.username} joined`)
        // });
        // console.log('room:',chat.data)
        var userToChannel =[]
        messageDB.find({roomID:chat.data},function (err, kittens) {
            if (err) return console.error(err);
            kittens.forEach(element => {
              // console.log(element)
              userToChannel.push(element)
            });
            // console.log("array:",userToChannel)
            return userToChannel
          }).then(function(userToChannel) {
            // console.log(userToChannel);
            // expected output: "Success!"
            var sendMessages = []
            userToChannel.forEach(element => {
              var sendMessage = {
                channelName: element.roomID,
                createdAt: element.createTime,
                status: element.status,
                text: element.text,
                user: {
                  id: element.userJSON.collectionOfMessage.name,
                  name: element.userJSON.collectionOfMessage.name,
                  joinedChannel : [{ firstTime:Date(),
                                    lastname :Date(),
                                    name:element.roomID}]   
                }
              }
              sendMessages.push(sendMessage)
            })
            return sendMessages.reverse()
            }).then(function(sendMessages) {
              let sendMes = {
                "type":"newMessage",
                "data":sendMessages
              }
              ws.send(JSON.stringify(sendMes))
              //console.log(sendMessages)
            })
        
        
        // console.log(userToChannel)
        ws.channel = chat.data
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

