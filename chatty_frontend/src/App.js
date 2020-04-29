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
      newRoomName:'',
      channelName:'',
      isSignIn: false,
      isOpenPopup: false,
      name: "",
      messages: [],
      user: {
        id: -1,
        name: ""
      },
      rooms: [],
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
    if(this.state.newRoomName !== '') {
      let allRooms = this.state.rooms
      let lastId = allRooms[allRooms.length-1].id
      allRooms.push({
        id: lastId + 1,
        name: this.state.newRoomName,
      })
      //tell server about new room
    }
  }

  signIn() {
    console.log("Sign in");
    //TODO generate user id
    if(this.state.name !== '')
    this.setState({ isSignIn: true, user: {id: 1, name: this.state.name} });
  }

  getName(e) {
    this.setState({ name: e.target.value });
  }

  getNewRoomName(e) {
    this.setState({ newRoomName: e.target.value });
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
      messages: [
        {
          id: 4,
          text: "ORA ORA ORA",
          createdAt: new Date(),
          status: true,
          user: {
            id: 2,
            name: "Jotaro",
          },
        },
        {
          id: 3,
          text: "MUDA MUDA MUDA",
          createdAt: new Date(),
          status: false,
          user: {
            id: 3,
            name: "Dio",
          },
        },
        {
          id: 2,
          text: "OHOH",
          createdAt: new Date(),
          status: false,
          user: {
            id: 3,
            name: "Dio",
          },
        },
        {
          id: 1,
          text: "DIO",
          createdAt: new Date(),
          status: false,
          user: {
            id: 2,
            name: "Jotaro",
          },
        },
      ],
      rooms: [
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
              Please enter the name of new room
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
              onChange={(e) => this.getNewRoomName(e)}
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
        {this.state.rooms.map(this.renderAChannel)}
      </List>
    );
  }

  renderAChannel(room) {
    return (
      <ListItem button onClick={() => {

      }}>
          <ListItemAvatar>
            <Avatar>{room.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={room.name} />
        </ListItem>
    )
  }

  renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Default channel
          </Typography>
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
