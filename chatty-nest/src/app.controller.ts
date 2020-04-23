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
  ws.on('message', function incoming(message) {
   
    console.log('received: %s', message);
  });

//close browser
ws.on('close', function close() {
  
    console.log('disconnected');
  });

//send data
ws.send('init message to client');
