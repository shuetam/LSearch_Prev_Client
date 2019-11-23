import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './Components/Header/Header';
import Field from './Components/Fields/Field';
import YTArea from './Components/Areas/YTArea';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import {authCheckState} from './Store/Actions/auth';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import Popup from './Components/Popup/Popup';
import ServerPopup from './Components/Popup/ServerPopup';
//import {scrollU, scrollD} from './Store/Actions/scroll';


class App extends Component {

    componentWillMount () {
        this.props.onTryAutoSignup();
      }

/*     scrollUp = () => {
        //debugger;
        scrollU(); }

    scrollDown = () => {
        scrollD();
        } */

    render() {
        return (
            <BrowserRouter>
                <div>
                <ReactScrollWheelHandler upHandler={ this.scrollUp} downHandler={this.scrollDown}>
                    <Route path={'/:id?'} component={Header} />
                    <Popup/>
                    <ServerPopup/>
                </ReactScrollWheelHandler>
                </div>
            </BrowserRouter>
        );
    }
}


  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(authCheckState() )
    };
  };

  export default  connect( null, mapDispatchToProps )( App );