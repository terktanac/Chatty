import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// material ui
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Box,
  TextField
} from "@material-ui/core";

// custom chat
import { GiftedChat } from "react-web-gifted-chat";

var socket

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      newchannelName:'',
      currentChannel:'',
      isSignIn: false,
      isOpenPopup: false,
      messages: [],
      user: {
        id: -1,
        name: "",
        joinedChannel: [
          {
            name: '',
            lastTime:'',
          },
        ],
      },
      channels: [],
    };
    this.loadChatHistory = this.loadChatHistory.bind(this)
  }

  setOpenPopUp() {
    this.setState({isOpenPopup:true})
  }

  setClosePopUp() {
    this.setState({isOpenPopup:false})
  }

  signIn() {
    console.log("Sign in");
    //TODO generate user id
    if(this.state.user.name !== '')
    this.setState({ isSignIn: true, user: {id: this.state.user.name, name: this.state.user.name, joinedChannel: []}});
    let sendData = {
      "type":"initial",
      "data": {
        "username":this.state.user.name
      }
    }
    this.state.socket.send(JSON.stringify(sendData))
  }

  getName(e) {
    let aUser = this.state.user
    aUser.name = e.target.value
    this.setState({ user: aUser});
  }

  addChannel() {
    
    if(this.state.newchannelName !== '') {
      let allchannels = this.state.channels
      allchannels.push({
        name: this.state.newchannelName,
      })
      this.setState({isOpenPopup:false})
      //tell server about new channel
    }
    let sendData = {
      "type":"createChannel",
      "data": {
        "chName":this.state.newchannelName,
        "createTime":new Date()
      }
    }
    this.state.socket.send(JSON.stringify(sendData))
  }

  getNewchannelName(e) {
    this.setState({ newchannelName: e.target.value });
  }
  
  signOut() {
    console.log("Sign out");
    this.setState({
      newchannelName: '',
         currentChannel: '',
         isSignIn: false,
         isOpenPopup: false,
         messages: [],
         user: {
           id: -1,
           name: "",
           joinedChannel: [{
             name: '',
             lastTime: '',
           }, ],
         },
         channels: [],
    });
  }

  onSend = (messages = [], leaveMessage=false) => {
    
    if (this.isJoinChannel(this.state.currentChannel) === -1 && !leaveMessage)
      return

    console.log(messages)
    messages[0]['status'] = false
    messages[0]['channelName'] = this.state.currentChannel
    let sendData = {
      "type":"message",
      "data": messages
    }
    this.state.socket.send(JSON.stringify(sendData))
    

  }

  //manage all websocket
  wsConnection() {
    socket.onmessage = (event) => {
      //console.log(event.data)
      let mes = JSON.parse(event.data)
      //console.log(mes.data.user)
      //console.log(message.data.type)
      if (mes.type === 'message') {
        //mes.data.user.id = mes.data.user.name
        let allMessage = this.state.messages
        for(let i = allMessage.length - 1; i >= 0; i--) {
          allMessage[i].status = false
        }
        console.log(mes.data)
        this.setState({ messages: allMessage })
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, mes.data),
        }));
       }
      if (mes.type === "initial") {
        console.log("initial joined",mes.data.joined)
        this.setState({joinedChannel:mes.data})
        let nowState = this.state
        nowState.user.joinedChannel = mes.data.joined
        this.setState(nowState)
        console.log(this.state.user.joinedChannel)

        
        return ([])
      }

      if (mes.type === "initChannel") {
        if(mes.data.channel !== '') {
          console.log("initial channel",mes.data.channel)
          let allchannels = this.state.channels
          allchannels=allchannels.concat(mes.data.channel)
          console.log(allchannels)
          this.setState({channels:allchannels})
      }
      }
      if (mes.type === 'newMessage') {
        //mes.data.user.id = mes.data.user.name
        let messageFromDB = mes.data
        let indexJoin = this.isJoinChannel(this.state.currentChannel)
        if (messageFromDB !== []) {
          for (let i = messageFromDB.length - 2; i >= 0; i--) {
            if (new Date(messageFromDB[i].createdAt).getTime() > new Date(this.state.user.joinedChannel[indexJoin].lastTime).getTime()) {
              messageFromDB[i + 1].status = true;
              break
            }
            else {
              messageFromDB[i + 1].status = false
            }
          }
        }

        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messageFromDB),
      }));}

      if (mes.type === "createChannel") {
        console.log("remote create",mes.data)
        if(mes.data !== '') {
          let allchannels = this.state.channels
          allchannels.push({
            name: mes.data,
          })
          this.setState({channels:allchannels})
      }
    }
     
  }}
  componentDidMount() {
    socket = new WebSocket("ws://localhost:4000")
    socket.onopen = () => {
      var sendData = {
          "type":"debug",
          "data": "connectted"
      }
      socket.send(JSON.stringify(sendData))
    }
    this.wsConnection()
    
    this.setState({
      socket:socket,
      channels: [
        // {
        //   name: 'Parallel', 
        // },
        // {
        //   name: 'Network', 
        // },
      ]
    });
  }

  componentWillMount() {
    
  }

  renderPopup() {
    return (
      <Dialog open={!this.state.isSignIn}>
        <DialogTitle id="signIn-header">
          <Box textAlign="center"  fontWeight="800">
            Sign in
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Box textAlign="center" color="primary.main">
              Please enter your name
            </Box>
          </DialogContentText>
          <form id="form" autoComplete="off" noValidate>
            <TextField
              tabIndex="1"
              autoFocus
              variant="outlined"
              margin="dense"
              id="name"
              autoComplete="off"
              label="name"
              fullWidth
              onChange={(e) => this.getName(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
            <Button onClick={() => this.signIn()} color="primary">
              Ok
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  }

  renderAddChannelPopUp() {
    return (
      <Dialog open={this.state.isOpenPopup} >
        <DialogContent>
          <DialogContentText component="div">
            <Box textAlign="center" color="primary.main">
              Please enter the name of new channel
            </Box>
          </DialogContentText>
          <form id="form" autoComplete="off" noValidate>
            <TextField
              tabIndex="1"
              autoFocus
              variant="outlined"
              margin="dense"
              id="name"
              autoComplete="off"
              label="name"
              fullWidth
              onChange={(e) => this.getNewchannelName(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" width="100%">
            <Button onClick={() => this.addChannel()} color="primary">
              OK
            </Button>
            <Button onClick={() => this.setClosePopUp()} color="primary">
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  }

  isJoinChannel = (channelName) => {
    let aUser = this.state.user
    for(let i = 0; i < aUser.joinedChannel.length; i++) {
      if(aUser.joinedChannel[i].name === channelName) {
        return i
      }
    }
    return -1
  }

  joinChannel = () => {
    let aUser = this.state.user
    aUser.joinedChannel.push({name:this.state.currentChannel,lastTime:null,firstTime:new Date()})
    let message = []
    let sendData = {
      "type":"changeChannel",
      "data": this.state.currentChannel
    }
    socket.send(JSON.stringify(sendData))
    message.push({
      id:'first',
      createdAt: new Date(),
      text: this.state.user.name + ' join ' + this.state.currentChannel + "!",
      user: this.state.user,
    })
    this.onSend(message)
    console.log("Get notification from channel "+this.state.currentChannel);
    this.setState({
      user:aUser
    })
  }
  
  leaveChannel = () => {
    let aUser = this.state.user
    let message = []
    let leaveMessage = true
    let index = this.isJoinChannel(this.state.currentChannel)
    aUser.joinedChannel.splice(index, 1)
    message.push({
      id: aUser.name.concat('leave', this.state.currentChannel, "at", new Date().toString()),
      createdAt: new Date(),
      text: this.state.user.name + ' leave ' + this.state.currentChannel + "!",
      user: aUser,
    })
    this.onSend(message, leaveMessage)
    this.setState({
      user:aUser,
      messages:[]
    })
    //TODO
    //when user press Leave -> send message type "message" to backend to update joined state
  }

  loadChatHistory = (channelName) => {
    console.log("Load chat history from " + channelName);
    return ([])
  }

  enterChannel = (channel) => {
    // channel = Network , current = Parallel
    let aUser = this.state.user
    let index = this.isJoinChannel(this.state.currentChannel)
    console.log(this.state.user.joinedChannel);
    // joinedChannel = [Network, Parallel]
    if(index !== -1) {
      let newData = this.state.user.joinedChannel[index]
      newData.lastTime = new Date()
      aUser.joinedChannel.push(newData)
      aUser.joinedChannel.splice(index,1)
      this.setState({
        user: aUser
      })
    }
    let indexJoin = this.isJoinChannel(channel.name)
    let allMessage = this.state.messages
    if(indexJoin !== -1  && this.state.currentChannel !== channel.name) {
      console.log("query")
      console.log("send ch name to back",channel.name)
      allMessage = this.loadChatHistory(channel.name)
      let sendData = {
        "type":"changeChannel",
        "data": channel.name
      }
      socket.send(JSON.stringify(sendData))
    }
    else if(indexJoin === -1) {
      this.setState({
        messages: [],
      })
    } 
    
    this.setState({
      messages:allMessage,
      currentChannel: channel.name,
    })
    
  }

  renderChannelsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Channels
          </Typography>
          <Button variant="contained" color="primary" onClick={() => this.setOpenPopUp()}>
            +
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  renderAChannel = (channel) => {
    let isJoin = this.isJoinChannel(channel.name) !== -1 ? ' (joined)' : ''
    return (
      <ListItem button onClick={() => this.enterChannel(channel)}>
          <ListItemAvatar>
            <Avatar>{channel.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={'#' + channel.name + isJoin} />
        </ListItem>
    )
  }

  renderChannels() {
    return (
      <List>
        {this.state.channels.map(this.renderAChannel)}
      </List>
    );
  }

  renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {this.state.currentChannel !== '' ? '#' + this.state.currentChannel : ''}
          </Typography>
          {this.isJoinChannel(this.state.currentChannel) === -1 && this.state.currentChannel !== '' && (<Button variant="contained" color="primary" onClick={() => this.joinChannel()}>Join</Button>)}
          {this.isJoinChannel(this.state.currentChannel) !== -1 && (<Button variant="contained" color="secondary" onClick={() => this.leaveChannel()}>Leave</Button>)}
        </Toolbar>
      </AppBar>
    );
  }

  renderChat() {
    return (
      <GiftedChat
        user={this.state.user}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        renderAvatarOnTop={true}
      />
    );
  }

  renderSettingsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  renderAUser = () => {
    return (
      <ListItem>
          <ListItemAvatar>
            <Avatar>{this.state.user.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={this.state.user.name} />
        </ListItem>
    )
  }

  renderSignOutButton() {
    return <Button onClick={() => this.signOut()}>Sign out</Button>;
  }

  render() {
    return (
      <div style={styles.container}>
        {this.renderAddChannelPopUp()}
        {this.renderPopup()}
        <div style={styles.channelList}>
          {this.renderChannelsHeader()}
          {this.renderChannels()}
        </div>
        <div style={styles.chat}>
          {this.renderChatHeader()}
          {this.renderChat()}
        </div>
        <div style={styles.settings}>
          {this.renderSettingsHeader()}
          {this.renderAUser()}
          {this.renderSignOutButton()}
        </div>
      </div>
    );
  }
}
export default App;
