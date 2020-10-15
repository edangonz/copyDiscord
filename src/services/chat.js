import { subject_chat$ } from '../observer/chatObserver';
import { connected_friend, subject_friends$ } from '../observer/connected_friends';
import { subjectRequestFriends$ } from '../observer/notice_friend';
import notification$ from '../observer/notification';

const io = require('socket.io-client');

class ChatService{
  constructor(){
    this.initSocket = this.initSocket.bind(this);
    this.endSocket = this.endSocket.bind(this);
    this.emitMessage = this.emitMessage.bind(this);

    this.audio = new Audio();
    this.audio.src = 'https://firebasestorage.googleapis.com/v0/b/fanpolquiz.appspot.com/o/get_message.mp3?alt=media&token=514e4e17-bd7b-4f6d-808c-51f645c00905';
    this.audio.load();
  }

  initSocket(user) {
    this.user = user;
    this.socket = io.connect('http://localhost:500', { query: {...user, friends: JSON.stringify(user.friends)} });

    this.socket.on('message', (data) => {
      console.log(data);
    })

    this.socket.on('friends_connected', (newfriend) => {
      connected_friend.get(newfriend._id).id_session = newfriend.id_session;
      subject_friends$.next();
    });
    this.socket.on('friends_disconnected', (oldfriend) => {
      connected_friend.get(oldfriend._id).id_session = undefined;
      subject_friends$.next();
    });

    this.socket.on('notification', (status) => notification$.next(status));
    this.socket.on('notification_friend', () => subjectRequestFriends$.next());
    this.socket.on('new_message', (message) => this.addMessage(message));
  }

  endSocket() {
    this.socket.disconnect();
  }

  addMessage(message){
    if(this.chat._id === message._id){
      this.chat.list_messages.push(message);
      subject_chat$.next();
      this.audio.play();
    }
  }

  emitMessage(message){
    if(this.chat){
      this.chat.list_messages.push({message: message, date: new Date(), onwer: this.user.id_user});
      subject_chat$.next();
      this.socket.emit('message', {message: message, onwer: this.user.id_user, _id: this.chat._id, id_friend: this.id_friend})
    }
  }

  setChat(chat, id_friend){
    this.chat = chat;
    this.id_friend = id_friend;
  }
}

export default new ChatService();