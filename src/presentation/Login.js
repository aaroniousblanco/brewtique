import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../Brewtique.actions';

class Login extends React.Component {
    render () {
        return (
            <div className='signup-content'>
                <h3>Login</h3>
                <form>
                    <div className='form-group'>
                        <div className="sign-up-error-message">{this.props.login_message.length > 0 ? this.props.login_message : ''}</div>
                        <label>Username</label>
                            <input className="form-control" placeholder='Enter username here' onChange={(event) => this.props.enteringLoginInfo(event.target.value, 'username')}/>
                        <label>Password</label>
                            <input type='password' className="form-control" placeholder='Enter your password here' onChange={(event) => this.props.enteringLoginInfo(event.target.value, 'password')}/>
                    </div>
                    <button type='submit' className='btn btn-success' onClick={() => this.props.loggingInActionCreator(this.props.logging_in_info)}>Login</button>
                </form>
            </div>
        );
    }
}

const LoginContainer = ReactRedux.connect(
    function (state) {
        return state.brewtique
    },
    actions
)(Login);

export default LoginContainer;
