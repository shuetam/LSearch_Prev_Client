import React, { Component } from 'react';
import './Icons.css';
import Header from '../Header/Header';
import Field from '../Fields/Field';
import { Link, Route, NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {popup, showServerPopup, addingIcon, removingIcon} from '../../Store/Actions/auth';
import {URL} from '../../environment';


class ImageIcon extends Component {

    constructor(props) {
        super(props);
    this.state = {
       src: "",
       noError: true,
    }
}
    
    componentDidMount() {

        this.setState({src: this.props.id });
    }

    removeIcon = (data, cross) => {

        axios.post(URL.api+URL.removeIcon, data)
        .then(() => {
            
            cross.className = 'addEntity';
            
        })
        .catch(error => {console.log(error); this.Alert("Przepraszamy, nie udało się usunąć ikony.")});
    }

    disableIcon = (data, entityToDisable) => {
        debugger;
          axios.post(URL.api+URL.removeIcon, data)
            .then(() => {
                //entityToDisable.className  = 'disable';
                this.props.sendToRemove(entityToDisable.id);

                //entityToDisable.id = entityToDisable.id + 'dis';
                })
            .catch(error => {console.log(error); this.Alert("Przepraszamy, nie udało się usunąć ikony.")});
    }


    moveIcon = (event) => {

        var ID = event.target.id;
        var cross = event.target;
        var entity = document.getElementById(ID);
        var name = entity.title

            const data = {
                        Id: ID,
                        Type: "IMG",
                        Source: this.props.url,
                        UserId: this.props.userId,
                        Title: name
                        }

        axios.post(URL.api+URL.moveIcon, data)
          .then(() => {
             //entity.className  = 'disable';
             this.props.sendToRemove(entity.id);
              })
          .catch(error => {console.log(error); this.Alert("Przepraszamy, nie udało się przenieść ikony.")});
  }

    Alert = (message) => {
        this.props.serverAlert(message);
    }


    onError = () => {
        //alert('The image could not be loaded.');
        const logo = require('./149932.png');
        this.setState({src: logo });

        if(this.props.newimage == true)
        {
            this.setState({noError: false});
        }
      }



    IconHandler = (event) => {
        
        var ID = event.target.id;
        var cross = event.target;
        var entity = document.getElementById(ID);
        var name = entity.title;
        var Top_ = entity.style.top;
        var Left_ = entity.style.left;


        if((entity.style.top).includes("px")) {
            Top_= ((parseFloat(Top_) / document.documentElement.clientHeight) * 100) +"vh";
            Left_ = ((parseFloat(Left_) / document.documentElement.clientWidth) * 100) + "vw";
        }
        
        //var folderid = this.props.folderId
        
            const data = {
                        Id: ID,
                        Type: "IMG",
                        UserId: this.props.userId,
                        Source: this.props.url,
                        Title: name,
                        Top: Top_,
                        Left: Left_,
                        FolderId: this.props.folderId
                        }

    
             
        if(event.target.className == "addEntity")
        {
            axios.post(URL.api+URL.addIcon, data)
            .then(() => {
               // debugger;
                cross.className = 'removeEntity'; cross.title = "Usuń z pulpitu";})
            .catch(error => {console.log(error); this.Alert("Przepraszamy, nie udało się dodać ikony.")});
        }

        if(event.target.className == "addingEntity")
        {
            debugger;
            const icon = {
                id: ID,
                title: "",
                source: this.props.url,
                top: entity.style.top,
                left: entity.style.left,
                type: "IMG"
            }

            axios.post(URL.api+URL.addIcon, data)
            .then(() => {
               // debugger;
               this.props.addToProps(icon)
               //entity.className = 'disable';
                //cross.className = 'removeEntity'; cross.title = "Usuń z pulpitu";
            })
            .catch(error => {console.log(error); this.Alert("Przepraszamy, nie udało się dodać ikony.")});
        }

        if(event.target.className == "removeEntity")
        {
           // debugger;
            if(localStorage.getItem(this.props.userId+"Y")==1) {
                this.removeIcon(data, cross);
            }
            else {
                this.props.MagnagePopup(data, cross);
            }
            
        }
        if(event.target.className == "disableEntity")
        { 
            var entityToDisable = document.getElementById(ID);

            if(localStorage.getItem(this.props.userId+"Y")==1) {

                this.disableIcon(data, entityToDisable)
            }
            else {
                this.props.MagnagePopup(data, entityToDisable);
            }

            
        }


    }

    render() {
        //var src =  this.props.id;
        var src =  this.state.src;
        var classEntity = "";
        var iconTitle = ""
       
        if(this.props.remover==3)
        {
            classEntity = "addingEntity";
            iconTitle = "Dodaj do pulpitu";
        }
      
        if(this.props.remover==0)
        {
            classEntity = "addEntity";
            iconTitle = "Dodaj do pulpitu";
        }
        if(this.props.remover==1)
        {
            classEntity = "removeEntity";
            iconTitle = "Usuń z pulpitu";
          
        }
        if(this.props.remover==2)
        {
            classEntity = "disableEntity";
            iconTitle = "Usuń z pulpitu";
        }
       
        var addIcon = this.props.isAuth?   <div id={this.props.id} onClick = {this.IconHandler}
        title={iconTitle} style={{left: "83%"}}  class={classEntity}>&#43;</div> : "";

        var moveIcon = //window.location.href.includes("folder")?
        (this.props.fromFolder && this.props.remover!==3)?
         <div id={this.props.id} onClick = {this.IconHandler}
        title={this.props.title}  class="moveEntity" style={{left: "-27%"}}><i id={this.props.id} onClick = {this.moveIcon}
        title="Przenieś ikonę do głównego pulpitu" class="icon-left-bold" onClick = {this.moveIcon} /></div>  : "";

        
        return (
            <div  onDoubleClick={this.props.linkTo}
            
            title={this.props.title} id={this.props.id}
            class={this.state.noError? this.props.classname : "disable"}
            style={this.props.location}
            onMouseOver={this.props.onHover}
            onMouseLeave={this.props.onLeave}>



                <img 
                   class="entImg"
                   id={this.props.id}
                   title={this.props.title} 
                   src={this.state.src}
                   
                   onError={this.onError}
                   >
                  </img> 
                  

                {/* <i class="icon-note" id={this.props.id}
                  title={this.props.title}  /> */} 
                    {addIcon}
                    {moveIcon}
                   
               
               {/*    <div id={this.props.id} onClick = {this.saveYT}
                  title={this.props.title}  class="addEntity">&#43;</div> */}
            </div>
                  
        )
    }
}

const mapStateToProps = state => {
    return {
        url: state.auth.sourceUrl,
    };
  };


const mapDispatchToProps = dispatch => {
    return {
        MagnagePopup: (data, cross) => dispatch(popup(data, cross)),
        serverAlert: (message) => dispatch(showServerPopup(message)),
        addToProps: (icon) => dispatch(addingIcon(icon)),
        sendToRemove: (id) => dispatch(removingIcon(id))
        
    };
};

  export default connect( null, mapDispatchToProps )(ImageIcon);