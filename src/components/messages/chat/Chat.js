import React from 'react'
import logo from '../../../logo.svg'
import './Chat.css'
import ChatService from '../../../services/chat';
import { subject_chat$ } from '../../../observer/chatObserver';

const { getDataChat } = require('../../../services/friends');

export default class Chat extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            previous_id_chat: undefined,
            list_messages: [],
        };

        this.getData = this.getData.bind(this);
    }

    getData(){
        getDataChat(this.props.current_friend.id_chat)
            .then((response) => {
                if(response.code === 500){
                    this.setState({list_messages: response.body.list_messages, previous_id_chat: response.body.previous_id_chat})
                    ChatService.setChat(response.body, this.props.current_friend._id);
                    if(this.state.list_messages.length < 20)
                        this.getPreviousDataChat();
                    this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight);
                }
            });
    }

    getPreviousDataChat(){
        getDataChat(this.state.previous_id_chat)
            .then((response) => {
                if(response.code === 500){
                    this.chat_data.list_messages = [...response.body.list_messages, ...this.chat_data.list_messages];
                    this.setState({list_messages: this.chat_data.list_messages, previous_id_chat: response.body.previous_id_chat})
                    this.messagesEnd.scrollTo(0, document.body.scrollHeight);
                }
            });
    }

    getMoreData(e){
        if(e.target.scrollTop <= 200){
            if(this.state.previous_id_chat)
                this.getPreviousDataChat();
        }
    }
    /*
    componentDidMount(){
        this.timeset = setTimeout(() => this.getData(), 250);
        this.observable = subject_chat$.asObservable()
            .subscribe(() => {
                this.setState({list_messages: this.chat_data.list_messages})
                if(this.messagesEnd)
                    setTimeout(() => this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight), 100);
            });
    }

    componentDidUpdate(prevProps){
        if(this.props.friend._id !== prevProps.friend._id) 
            this.getData();
    }

    componentWillUnmount(){
        if(this.timeset)
            window.clearInterval(this.timeset);
        this.observable.unsubscribe();
        window.onscroll = null;
    }
    */
    render(){
        return (
            <div className="container-messages">
                <h2 className="container-messages__title">{this.props.current_friend.username} <div></div></h2>
                <div className="container-messages__chat"
                    onScroll={(e) => this.getMoreData(e)}
                    ref={(el) => { this.messagesEnd = el }}>
                    {this.state.list_messages && this.state.list_messages.map((m, index) => 
                    <div className={`container-messages__chat__message ${(m.onwer!==this.props.current_friend._id)?'onwer_container':''}`}
                        key={index}>
                        <img src={logo} alt="profile user"/>
                        <div className="container-messages__chat__message__body">
                            <h4 className="text text--name">
                                {(m.onwer===this.props.current_friend._id)?this.props.current_friend.username: 'Yo'}
                                <span className="font-small">{(new Date(m.date)).toDateString()}</span>
                            </h4>
                            <p className="text text--mesage">{m.message}</p>
                        </div>
                    </div>
                    )}
                </div>
            </div>    
        )
    }
}