
import React, { Component } from 'react';
import './Field.css';
import { Route, NavLink, Switch, withRouter } from 'react-router-dom';


class InfoField extends Component {

    constructor(props) {
        super(props);

        this.state = {  
        }
    }

    render() {
 
    let field = this.props.fromFolder?
    (<div class="fieldAct"><span style={{fontSize: "20px", color: "rgba(255, 255, 255, 0.801)"}}>Nie posiadasz ikon w tym folderze.</span><p/>
        Upuść nad folderem wybrane ikony na pulpicie głównym
        <br/>lub naciśnij <span  class="addOwn" > &#43; </span>
        w prawym dolnym rogu ekranu aby dodać nowe ikony.
        </div>)
    :
    (<div class="fieldAct"><span style={{fontSize: "20px", color: "rgba(255, 255, 255, 0.801)"}}>Nie posiadasz ikon na głównym pulpicie.</span><p/>
        Naciśnij <span class="addIconInfo">&#43;
        </span> przy wybranej ikonie w sekcjach<br/>
        <span style={{color: "rgba(255, 255, 255, 0.801)"}}><i class="icon-note"/>Muzyka&nbsp;<i class="icon-video-alt"/>Film
        &nbsp;<i class="icon-video"/>Seriale&nbsp;<i class="icon-book"/>Literatura 
        &nbsp;<i class="icon-calendar-empty"/>Wydarzenia</span>
        <br/>lub <span  class="addOwn" > &#43; </span>
        w prawym dolnym rogu ekranu, aby dodać nowe ikony.
        </div>)
        ;

        if(this.props.show) {
            return field;   
        }
        else {
            return "";
        }

    }
}

export default withRouter(InfoField);