import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../Brewtique.actions';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';

class SignUp extends React.Component{
    render () {
        return (
            <div className='signup-content'>
                <h3>Sign Up Form</h3>
                <form>
                    <div className='form-group'>
                        <div className="sign-up-error-message">{this.props.duplicate_message.length > 1 ? this.props.duplicate_message : ''}</div>
                        <label>Username</label>
                            <input className="form-control" placeholder='Enter username here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'username')}/>
                        <label>Email</label>
                            <input className="form-control" placeholder='Enter email address here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'email_address')}/>
                        <label>First Name</label>
                            <input className="form-control" placeholder='Enter your first name here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'first_name')}/>
                        <label>Last Name</label>
                            <input className="form-control" placeholder='Enter your last name here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'last_name')}/>
                        <label>Password</label>
                            <input type='password' className="form-control" placeholder='Enter your password here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'password')}/>
                        <label>Confirm Password</label>
                            <div className='sign-up-error-message'>{this.props.signup_message.length > 1 ? this.props.signup_message : ''}</div>
                            <input type='password' className="form-control" placeholder='Re-enter your password here' onChange={(event) => this.props.enteringSignUpInfo(event.target.value, 'confirming_password')}/>
                    </div>
                    <button type='submit' className='btn btn-success' onClick={() => this.props.signUpUserActionCreator(this.props.signup_info)}>Submit</button>
                </form>
            </div>
        );
    }
}



const SignUpContainer = ReactRedux.connect(
    function (state) {
        return state.brewtique
    },
    actions
)(SignUp);

export default SignUpContainer;
