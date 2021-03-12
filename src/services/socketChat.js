//import { subject_chat$ } from '../observer/chatObserver';
//import { connected_friend, subject_friends$ } from '../observer/connected_friends';
//import { subjectRequestFriends$ } from '../observer/notice_friend';
//import notification$ from '../observer/notification';
import { getCookie} from "./curl";

const io = require('socket.io-client');

const audio = new Audio();
audio.src = 'https://firebasestorage.googleapis.com/v0/b/fanpolquiz.appspot.com/o/get_message.mp3?alt=media&token=514e4e17-bd7b-4f6d-808c-51f645c00905';
audio.load();

var socket;

const initSocket = (user, action) => {
  //friends: JSON.stringify(user) , { query: {...user}}
  let token = getCookie(document.cookie)
  
  if(token)
    socket = io.connect('http://localhost:5001/', { query: {...user, token: token}});

  socket.on('message', (data) => {
    action("ADDCHATFILE", data)
  });

  socket.on('typing', (data) => {
    action('TYPING', data)
  });
/*
    this.socket.on('friends_connected', (newfriend) => {
      connected_friend.get(newfriend._id).id_session = newfriend.id_session;
      subject_friends$.next();
    });
    this.socket.on('friends_disconnected', (oldfriend) => {
      connected_friend.get(oldfriend._id).id_session = undefined;
      subject_friends$.next();
    });*/

    //this.socket.on('notification', (status) => notification$.next(status));
    //this.socket.on('notification_friend', () => subjectRequestFriends$.next());
    //this.socket.on('new_message', (message) => this.addMessage(message));
  }

const endSocket = () => {
  socket.disconnect();
}
/*
  addMessage(message){
    if(this.chat._id === message._id){
      this.chat.list_messages.push(message);
      //subject_chat$.next();
      this.audio.play();
    }
  }
*/
const emitMessage = (message, _id, _id_friend) => {
  socket.emit('message', {message: message, _id : _id, _id_friend : _id_friend})
}

const typing = (_id_friend, state) => {
  socket.emit('typing', {_id_friend : _id_friend, state : state});
}

/*
  setChat(chat, id_friend){
    this.chat = chat;
    this.id_friend = id_friend;
  }
*/
export {
  initSocket,
  endSocket,
  emitMessage,
  typing,
};