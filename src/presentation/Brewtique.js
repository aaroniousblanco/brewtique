import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../Brewtique.actions';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';

class Brewtique extends React.Component {

    render () {
        return (
            <div className='main-content'>
                    <div className='product-images'>
                        <IndexLink to='/product/1'><input type='image' src={'/images/pliny.png'} /></IndexLink>
                        <IndexLink to='/product/2'><input type='image' src={'/images/bcbcs.jpg'} /></IndexLink>
                        <IndexLink to='/product/4'><input type='image' src={'/images/Trillium-Heavy-Mettle.png'} /></IndexLink>
                    </div>
            </div>
        );
    }
}

const BrewtiqueContainer = ReactRedux.connect(
    function (state) {
        return state.brewtique
    },
    actions
)(Brewtique);

export default BrewtiqueContainer;
