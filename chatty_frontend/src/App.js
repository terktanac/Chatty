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
      isSignIn: false,
      name: "",
      messages: [],
      user: {
        id: -1,
        name: ""
      }
    };
  }

  signIn() {

    console.log("Sign in");
    //TODO generate user id
    this.setState({ isSignIn: true, user: {id: 1, name: this.state.name} });
  }

  getName(e) {
    this.setState({ name: e.target.value });
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
          id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            id: 2,
            name: 'React',
            avatar: '../userPic/logo192.png',
          },
        },
      ],
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

  renderSignOutButton() {
    return <Button onClick={() => this.signOut()}>Sign out</Button>;
  }

  renderChat() {
    return (
      <GiftedChat
        user={this.state.user}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
      />
    );
  }

  renderChannels() {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar p={10}>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Default" />
        </ListItem>

        <ListItem button>
          <ListItemAvatar>
            <Avatar p={10}>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary="GGG" />
        </ListItem>
      </List>
    );
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
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div style={styles.container}>
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
