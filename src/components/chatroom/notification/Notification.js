import React from 'react';
import logo from '../../../logo.svg';
import './Notification.css'
import notification$ from '../../../observer/notification';
import { Spring } from 'react-spring/renderprops'
import { subject_update_friends$ } from '../../../observer/connected_friends';

const { deleteNotification, getNotifications } = require('../../../services/notificationservice');

export default class Notification extends React.Component{
    constructor(){
        super();

        this.state = {
            seen_notification: false,
            notifications: [],
        }

        this.getTiming = this.getTiming.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }

    componentDidMount(){
        this.observable = notification$.asObservable()
            .subscribe((code) => {
                if(code === 402 || code === 206)
                    subject_update_friends$.next();
                if(code !== 206){
                    getNotifications()
                        .then(response => this.setState({notifications: response.body}));}
            });
        notification$.next();
    }

    componentWillUnmount(){
        this.observable.unsubscribe();
    }

    removeNotification(_id){
        deleteNotification(_id)
            .then(() => notification$.next());
    }

    getTiming(date){
        let timing = ((new Date()) - new Date(date))/36e5;

        if(timing < 1)
            return Math.trunc(timing * 60) + ' minutos'
        else if(timing > 24)
            return Math.trunc(timing/24) + ' dias'
        return Math.trunc(timing) + ' horas'
    }   

    render() {
        return(
            <div className="bell-notification" onMouseLeave={() => this.setState({seen_notification: false})}>
                <i className="fas fa-bell" onClick={() => this.setState({seen_notification: !this.state.seen_notification})}>
                    {this.state.notifications.length?<div className="point-orange"></div>:''}
                </i>
                {this.state.seen_notification?
                <Spring
                    config={{duration: 50}}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}>
                    {props =>
                    (<div style={props} className="card card-notification">
                        <h3 className="text title title--body">Notificaciones</h3>
                        {this.state.notifications.length?this.state.notifications.map((notification, index) =>
                            <div key={index} className="contact contact--notification">
                                <img src={logo} alt="profile" className="logo"/>
                                <div className="contact--friends__text">
                                    <span className="text text--friend username">{notification.username + ' '}</span>
                                    <span className="text username" style={{fontSize: '0.618em'}}>Acepto tu solicitud</span>
                                    <p className="text username">Hace {this.getTiming(notification.date)}</p>
                                </div>
                                <div className="mini-icon">
                                    <i className="fas fa-times"  onClick={() => this.removeNotification(notification._id)}></i>
                                </div>
                            </div>
                        ):<div style={{padding: '1rem'}}><p className="text text--friend username">No hay notificaciones</p></div>}
                    </div>)}
                </Spring>:''}
            </div>
        );
    }
}