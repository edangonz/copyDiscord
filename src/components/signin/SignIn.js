import React from 'react'
import './SignIn.css'
import Bubbles from '../bubbles/Bubbles'

import { Spring } from 'react-spring/renderprops'

const { isSignIn, signIn, createAccount } = require('../../services/auth');

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
            seen_login: true,
            message: undefined
        }

        this.isSignIn = this.isSignIn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSumitRegister = this.onSumitRegister.bind(this);
    }

    componentDidMount(){
        this.isSignIn();
    }
    
    isSignIn(){
        isSignIn()
            .then((response) => {
                if(response.code !== 103 && response.code !== 104)
                    this.props.login(response.body);
            });
    }

    onSubmit(e) {
        if(e)
            e.preventDefault();

        signIn({username: this.state.username, password: this.state.password})
            .then((response) => {
                if(response.code !== 105) {
                    document.cookie=`token=${response.body['access-token']}; path=/;`
                    this.isSignIn();
                } else 
                    this.setState({ message: 'Credenciales incorrectas' })
            })
            .catch(() => this.setState({ message: 'Credenciales incorrectas' }));
    } 

    onSumitRegister(e){
        e.preventDefault();

        if(this.state.username.length >= 8 && this.state.password.length >= 3) {
            createAccount({username: this.state.username, password: this.state.password})
                .then((response) => {
                    if(response.code === 102)
                        this.onSubmit(undefined);                        
                    else 
                        this.setState({ message: 'Credenciales incorrectas' });
                }).catch(() => this.setState({ message: 'Credenciales incorrectas' }));
        } else
            this.setState({ message: 'Ingrese un usuario de al menos 8 caracteres' });
    }

    render(){
        return (
            <div className="SignIn">
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
