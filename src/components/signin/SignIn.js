import React from 'react'
import './SignIn.css'
import Bubbles from './bubbles/Bubbles'

import { Spring } from 'react-spring/renderprops'

const { signIn, createAccount } = require('../../services/auth');

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
            seen_login: true,
            message: undefined
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSumitRegister = this.onSumitRegister.bind(this);
        this.replaceMesage = this.replaceMesage.bind(this);
    }

    onSubmit(e) {
        if(e) e.preventDefault();

        signIn(this.state.username, this.state.password)
            .then((response) => {
                if(response.code === 100) {
                    document.cookie=`token=${response.body['access-token']}; path=/;`
                    this.props.login(response.body)
                } else 
                    this.replaceMesage(105)
            })
            .catch(() => this.replaceMesage(105));
    }

    onSumitRegister(e){
        e.preventDefault();

        if(this.state.username.length >= 8 && this.state.password.length >= 3) {
            createAccount({username: this.state.username, password: this.state.password})
                .then((response) => {
                    if(response.code === 102)
                        this.onSubmit(undefined);                        
                    else 
                        this.setState(this.replaceMesage(105));
                }).catch(() => this.replaceMesage(105));
        } else
            this.replaceMesage(109);
    }

    replaceMesage(code){
        let message;

        switch (code) {
            case 105:
                message = 'Credenciales incorrectas';
                break;
            case 109:
                message = 'Ingrese un usuario de al menos 8 caracteres';
                break;
            default :
                break;
        }

        this.setState({ message: message })
    }

    render(){
        return (
            <div className="main-container center">
                <Spring
                    from={{ opacity: 0, transform: 'translateY(-100px)' }}
                    to={{ opacity: 1, transform: 'translateY(0)' }}>
                    {props =>
                        (
                            <form style={props} className="form-login card" onSubmit={this.state.seen_login?this.onSubmit:this.onSumitRegister}>
                                <h3>{ this.state.seen_login? 'Iniciar sesión': 'Registrar cuenta' }</h3>
                                <label htmlFor="username">Usuario</label>
                                <input type="text" placeholder="Usuario" id="username"
                                    value={this.state.username} onChange={(e) => this.setState({username: e.target.value, message: ''})}></input>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" placeholder="Contraseña" id="password"
                                    value={this.state.password} onChange={(e) => this.setState({password: e.target.value, message: ''})}></input>
                                <button type="submit">{this.state.seen_login?'Iniciar sesión': 'Registrate'}</button>
                                <span className="font-small">{this.state.seen_login?'¿Necesitas una cuenta?':'¿Ya tiene una cuenta?'}
                                    <span className="link"
                                        onClick={() => this.setState({seen_login: !this.state.seen_login})}>{this.state.seen_login?' Registrate': ' Inicie sessión'}</span>
                                </span>
                                <p className="font-small error">{this.state.message}</p>    
                            </form>
                        )
                    }
                </Spring>
                <Bubbles/>
            </div>
        )
    }
}
