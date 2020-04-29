import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// database
import firebase from "firebase";

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

const config = {
  apiKey: "AIzaSyCFHAzrXFy6mMU3jkzbz-4TXvDTDdQyZak",
  authDomain: "chat-d8714.firebaseapp.com",
  databaseURL: "https://chat-d8714.firebaseio.com",
  projectId: "chat-d8714",
  storageBucket: "chat-d8714.appspot.com",
  messagingSenderId: "279941056049",
  appId: "1:279941056049:web:ed4998671258c1f88a7710",
  measurementId: "G-YQH7E78NRG"
};
firebase.initializeApp(config);

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
      channelName:'',
      currentChannel:'',
      isSignIn: false,
      isOpenPopup: false,
      messages: [],
      user: {
        id: -1,
        name: "",
        joinedChannel: new Set([]),
      },
      channels: [],
    };
  }

  setOpenPopUp() {
    this.setState({isOpenPopup:true})
  }

  setClosePopUp() {
    this.setState({isOpenPopup:false})
  }

  addChannel() {
    this.setState({isOpenPopup:false})
    if(this.state.newchannelName !== '') {
      let allchannels = this.state.channels
      let lastId = allchannels[allchannels.length-1].id
      allchannels.push({
        id: lastId + 1,
        name: this.state.newchannelName,
      })
      //tell server about new channel
    }
  }

  signIn() {
    console.log("Sign in");
    //TODO generate user id
    if(this.state.user.name !== '')
    this.setState({ isSignIn: true, user: {id: 1, name: this.state.user.name, joinedChannel: new Set([])} });
  }

  getName(e) {
    let aUser = this.state.user
    aUser.name = e.target.value
    this.setState({ user: aUser});
  }

  getNewchannelName(e) {
    this.setState({ newchannelName: e.target.value });
  }
  
  signOut() {
    //firebase.auth().signOut();
    console.log("Sign out");
    this.setState({ isSignIn: false, user: { id:-1, name: "" } });
  }

  onSend(messages=[]) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  saveMessage(message) {

    console.log("Save message");
  }
  
  componentDidMount() {
    this.setState({
      // TODO set from database
      // messages: [
      //   {
      //     id: 4,
      //     text: "ORA ORA ORA",
      //     createdAt: new Date(),
      //     status: true,
      //     user: {
      //       id: 2,
      //       name: "Jotaro",
      //     },
      //   },
      //   {
      //     id: 3,
      //     text: "MUDA MUDA MUDA",
      //     createdAt: new Date(),
      //     status: false,
      //     user: {
      //       id: 3,
      //       name: "Dio",
      //     },
      //   },
      //   {
      //     id: 2,
      //     text: "OHOH",
      //     createdAt: new Date(),
      //     status: false,
      //     user: {
      //       id: 3,
      //       name: "Dio",
      //     },
      //   },
      //   {
      //     id: 1,
      //     text: "DIO",
      //     createdAt: new Date(),
      //     status: false,
      //     user: {
      //       id: 2,
      //       name: "Jotaro",
      //     },
      //   },
      // ],
      channels: [
        {
          id : 1,
          name: 'Parallel', 
        },
        {
          id : 2,
          name: 'Network', 
        },
      ]
    });
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

  renderSignOutButton() {
    return <Button onClick={() => this.signOut()}>Sign out</Button>;
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

  renderChannels() {
    return (
      <List>
        {this.state.channels.map(this.renderAChannel)}
      </List>
    );
  }

  joinChannel = () => {
    let aUser = this.state.user
    aUser.joinedChannel.add(this.state.currentChannel)
    //get data from backend
    this.setState({
      user:aUser
    })
  }
  
  leaveChannel = () => {
    let aUser = this.state.user
    aUser.joinedChannel.delete(this.state.currentChannel)
    this.setState({
      user:aUser
    })
  }

  enterChannel = (channel) => {
    if(this.state.user.joinedChannel.has(channel.id)) {
      //get data from backend
    }
    this.setState({
      currentChannel:channel.id,
      channelName:channel.name,
    })
    
    
  }

  renderAChannel = (channel) => {
    return (
      <ListItem button onClick={() => this.enterChannel(channel)}>
          <ListItemAvatar>
            <Avatar>{channel.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={'#' + channel.name} />
          <p>{this.state.user.joinedChannel.has(channel.id) ? '#' + channel.name + '(joined)' : ''}</p>
        </ListItem>
    )
  }

  renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {this.state.channelName !== '' ? '#' + this.state.channelName : ''}
          </Typography>
          {!this.state.user.joinedChannel.has(this.state.currentChannel) && this.state.currentChannel !== '' && (<Button variant="contained" color="primary" onClick={() => this.joinChannel()}>Join</Button>)}
          {(this.state.user.joinedChannel.has(this.state.currentChannel)) && (<Button variant="contained" color="primary" onClick={() => this.leaveChannel()}>Leave</Button>)}
        </Toolbar>
      </AppBar>
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
          {this.renderSignOutButton()}
        </div>
      </div>
    );
  }
}
export default App;
