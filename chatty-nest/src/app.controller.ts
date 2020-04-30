import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

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