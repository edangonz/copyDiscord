import React from 'react'
import Friends from '../friend/Friends'

const { searchFriends } = require('../../../../services/friends');
const { sendFriendRequest } = require('../../../../services/requestService');
const { getMessage } = require('../../../../services/message');

export default class Newfriend extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            formValue: '',
            list_user: [],
            contact_selected: undefined,
            message: {color: 'var(--font-secondary)', message: 'Enviar solicitud de amistad entrante'},
        }

        this.interval = null;
        this.selectFriend = this.selectFriend.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    searchForm(e) {
        this.setState({ formValue: e.target.value, contact_selected: undefined});
        
        if(e.target.value !== '' && e.target.value.length >= 3){
            if(this.interval)
                window.clearInterval(this.interval);
            this.interval = window.setTimeout(() => this.search(this.state.formValue), 500);
        } else 
            this.setState({list_user: []});
    }

    search(filter){
        searchFriends(filter)
            .then((response) => {
                if(response.data.code === 201)
                    this.setState({list_user: response.data.body})
            });
    }

    selectFriend(friend){
        this.setState({ formValue: friend.username, contact_selected: friend});
    }

    onSubmit(e) {
        e.preventDefault();
        sendFriendRequest(this.state.contact_selected._id)
            .then(response => this.setState({message : getMessage(response.data.code, this.state.contact_selected)}));
    }

    render(){
        return (
            <>
                <h3 className="text title title--body">Añade un nuevo amigo</h3>
                <p className="text title title--body" style={{fontSize: '0.618em', color: this.state.message.color}}>{this.state.message.message}</p>

                <form className="form-new-friend" onSubmit={(e) => this.onSubmit(e)}>
                    <input type="text"
                    placeholder="Busca un nuevo amigo"
                    value={this.state.formValue}
                    onChange={(e) => this.searchForm(e)}/>
                    <button type="submit" className={(this.state.contact_selected === undefined)?'block':''}
                        disabled={this.state.contact_selected === undefined}>Enviar solicitud de amistad</button>
                </form>

                <Friends 
                    action={this.selectFriend}
                    list_friends={this.state.list_user}/>
            </>
        );
    }
}