import React from 'react'

export default class FormLogin extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
            seen_login: true,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSumitRegister = this.onSumitRegister.bind(this);
    }

    onSubmit(e){
        if(e) e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }

    onSumitRegister(e) {
        if(e) e.preventDefault();
        this.props.onSumitRegister(this.state.username, this.state.password);
    }

    render() {
        return (
        <form style={this.props.props} className="form-login card"
            onSubmit={this.state.seen_login?this.onSubmit:this.onSumitRegister}>
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
            <p className="font-small error">{this.props.message}</p>
        </form>
        )
    }
}