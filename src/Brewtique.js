import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Brewtique.actions';

class Brewtique extends React.Component {

    render () {
        return (
            <div className='main-content'>
                    <div className='product-images'>
                        <a href='/#/product/1'><input type='image' src={'/images/pliny.png'} onClick={() => this.props.fetchPageData(1)}/></a>
                        <a href='/#/product/2'><input type='image' src={'/images/bcbcs.jpg'} onClick={() => this.props.fetchPageData(2)}/></a>
                        <a href='/#/product/4'><input type='image' src={'/images/Trillium-Heavy-Mettle.png'} onClick={() => this.props.fetchPageData(4)}/></a>
                        <input type='image' src={'/images/bcbcs.jpg'}/>
                        <br/>
                        <input type='image' src={'/images/bcbcs.jpg'}/>
                        <input type='image' src={'/images/pliny.png'}/>
                        <input type='image' src={'/images/Trillium-Heavy-Mettle.png'}/>
                        <input type='image' src={'/images/pliny.png'}/>
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
