import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';
import brewtiqueReducer from './Brewtique.reducer';
import BrewtiqueContainer from './Brewtique';
import ProductPageContainer from './ProductPage';
import './index.css';

const reducer = Redux.combineReducers({
    brewtique: brewtiqueReducer
})

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(ReduxThunk)
);

const AppLayout = ({ children }) =>
    <div>
        <div className='header'>
            <IndexLink to='/'><img src={'/images/pint.svg'}/></IndexLink>
            <div className='home-title'>Brewtique</div>
        </div>
        <div>
            {children}
        </div>
    </div>;

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={AppLayout}>
                <IndexRoute component={BrewtiqueContainer}/>
                <Route path='/product/:product_id' component={ProductPageContainer}/>
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
