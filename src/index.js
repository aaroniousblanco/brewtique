import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';
import brewtiqueReducer from './Brewtique.reducer';
import BrewtiqueContainer from './presentation/Brewtique';
import ProductPageContainer from './presentation/ProductPage';
import SignUpContainer from './presentation/SignUp';
import LoginContainer from './presentation/Login';
import * as actions from './Brewtique.actions';
import { persistStore, autoRehydrate } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';
import './index.css';

const reducer = Redux.combineReducers({
    brewtique: brewtiqueReducer
})

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.compose(Redux.applyMiddleware(ReduxThunk), autoRehydrate())
);

persistStore(store, { storage: new CookieStorage() });

class AppLayout extends React.Component {
    render (children) {
        return (
            <div>
                <div className='header'>
                    <IndexLink to='/'><
                        img src={'/images/pint.svg'}/>
                    </IndexLink>
                    <div className='home-title'>
                        Brewtique
                    </div>
                    {this.props.logging_in_info.username === null ?
                        <div className="sign-up-login">
                        <Link to='/api/user/signup'>
                            <div className='signup_link'>
                                Sign Up
                            </div>
                        </Link>
                        <Link to='/api/user/login'>
                            <div className='login_link'>
                                | Login
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="sign-up-login">
                        <div className='signup_link'>
                            Welcome {this.props.logging_in_info.first_name}!
                        </div>
                        <Link to='/' onClick={() => this.props.logout()}>
                            <div className='login_link'>
                                | Logout
                            </div>
                        </Link>
                    </div>
                    }
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const AppLayoutContainer = ReactRedux.connect(
    function (state) {
        return state.brewtique
    },
    actions
)(AppLayout);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={AppLayoutContainer}>
                <IndexRoute component={BrewtiqueContainer}/>
                <Route path='/product/:product_id' component={ProductPageContainer}/>
                <Route path='/api/user/signup' component={SignUpContainer}/>
                <Route path='/api/user/login' component={LoginContainer}/>
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
