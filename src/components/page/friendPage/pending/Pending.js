import React from 'react';
import logo from '../../../../logo.svg';
import { subject_update_friends$ } from '../../../../observer/connected_friends';
import { subjectRequestFriends$ } from '../../../../observer/notice_friend';
const { getRequestFriend, aceptRequestFriend, declineRequestFriend } =  require('../../../../services/requestService');

export default class Pending extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            list_users: []
        }

        this.getRequest = this.getRequest.bind(this);
        this.aceptRequest = this.aceptRequest.bind(this);
        this.declineRequest = this.declineRequest.bind(this);
    }

    componentDidMount(){
        this.getRequest();
        /*

        this.observabe = subjectRequestFriends$.asObservable()
            .subscribe(() => this.getRequest());*/
    }

    componentWillUnmount(){/*
        this.observabe.unsubscribe();
        */
    }

    getRequest(){
        getRequestFriend().then(response => {
            if(response.code !== 407 && response.code !== 408)
                this.setState({list_users: response.body});
        })
    }

    aceptRequest(_id){
        aceptRequestFriend(_id)
            .then((response) => {
                if(response.code === 402){
                    subjectRequestFriends$.next();
                    subject_update_friends$.next();
                }
            });
    }

    declineRequest(_id){
        declineRequestFriend(_id)
            .then((response) => {
                if(response.code !== 407)
                    this.getRequest();
            });
    }

    render(){
        return (
            <>
            <h3 className="text title title--body">Solicitudes de amistad - {this.state.list_users.length}</h3>
            {this.state.list_users.map((f, index) =>
                <div key={index} className="contact contact--friend">
                    <div className="row">
                      <img className="contact__avatar" src={logo} alt="profile potho"/>
                      <div className="column">   
                        <p className="text text--friend username">{f.username}</p>
                        <p className="text text--friend username" style={{fontSize: '0.618em'}}>Solicitud de amistad entrante</p>
                      </div>
                    </div>
                    <div className="contact--friends__icon">
                        <div className="icon check" onClick={() => this.aceptRequest(f._id)}>
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="icon nocheck" onClick={() => this.declineRequest(f._id)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>)
            }
        </>
        );
    }
}