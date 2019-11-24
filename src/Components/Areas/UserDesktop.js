import React, { Component } from 'react';
import '../../App.css';
import './Area.css';
import './table.css';
import Header from '../Header/Header';
import Field from '../Fields/Field';
import ImageField from '../Fields/ImageField';
import { Link, Route, NavLink } from 'react-router-dom';
import YTIcon from '../Icons/YTIcon';
import ImageIcon from '../Icons/ImageIcon';
import Folder from '../Icons/Folder';
import { BrowserRouter } from 'react-router-dom';
import randoom from 'random-int';
import axios from '../../axios-song';
import { connect } from 'react-redux';
import { showServerPopup, addingIcon, stopAddingIcon, stopRemovingIcon} from '../../Store/Actions/auth';
import { URL } from '../../environment'



class UserDesktop extends Component {

    constructor(props) {
        super(props);

        /* fetch(this.props.fetchData )
        .then(res => res.json()).then((result) => this.setState({songs: result})).then(()=> this.setMaxCount());
        
 */
        this.state = {

            mainTitle: ".",
            loadedIcons: false,
            intervalSong: null,
            maxCount: null,
            ytCount: null,
            fetchFrom: null,
            hoveredId: "",
            entityID: "",
            actuallOpacity: 0.4,
            nowPlayed: "",
            playedShadow: '#FFF 0px 0px 5px, 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), #FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 10px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgb(255, 45, 45) 0px 0px 15px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 20px, rgb(255, 45, 45) 0px 0px 2px 5px',
            prevShadow: '#FFF 0px 0px 5px, 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), #FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgba(231, 173, 64, 0.637) 0px 0px 20px 10px,  rgba(231, 173, 64, 0.637) 0px 0px 10px, rgba(231, 173, 64, 0.637) 0px 0px 10px, rgba(231, 173, 64, 0.637) 0px 0px 20px, rgba(231, 173, 64, 0.637) 0px 0px 2px 5px',
         
            idInMove: "",

            wrongWWW: false,

            icons: [
            ],

            folders: [
            ],
            prevPlayed: [  
            ],
            currentFolderTop: "",
            currentFolderLeft: "",
            fromFolder: false,

            newIcons: [
            ],
            newImages: [

            ],
            images: [
            ],
            iconsFound: false,
            addingIcon: false,
            imgField: false,
            ytField: true,
            addingIconData: {},
            folderId: "",
            sourceUrl: "",
            noIconsFound: false,
            searchingIcons: false,
            
           
        }
    }

  //  playedShadow: '#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgb(255, 45, 45) 0px 0px 30px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 20px, rgb(255, 45, 45) 0px 0px 2px 5px',


    componentDidMount() {

        var propss = this.props;
     
        var folderId = this.props.match.params.fid? this.props.match.params.fid : "";
        //var folderId = "";
        this.setState({fromFolder: this.props.match.params.fid? true : false });
        this.setState({folderId: folderId });
        //debugger;
        this.getImages(this.props.userId, folderId);
        this.getIcons(this.props.userId, folderId);
    }

    componentWillUpdate() {

    }

    componentWillReceiveProps(nextProps) {
        debugger;

            if(nextProps.removedId) {
                //this.removeIconById(nextProps.removedId);
                this.disableIconById(nextProps.removedId);
                this.props.stopRemoving();
            }

        if(nextProps.addingIcon) 
        {
        
      // document.getElementById(addingIcon.id).className = "disable";
      debugger;

      if(nextProps.addingIcon.type == "YT") {
          this.disableAddingIcon(nextProps.addingIcon.id)
                this.setState(prevState => ({
                    icons: [...prevState.icons, nextProps.addingIcon]
                  }));
    
                  this.props.stopAdding();
            }

            if(nextProps.addingIcon.type == "IMG") {
                this.disableAddingImage(nextProps.addingIcon.id)
                      this.setState(prevState => ({
                          images: [...prevState.images, nextProps.addingIcon]
                        }));
          
                        this.props.stopAdding();
                  }
      }


      }

    getIcons = (Id, folderId) => {
        this.setState({loadedIcons: false});
        //debugger;
        const data = {
            userId: Id,
            folderId: folderId
            
        };
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            }};
        
     axios.post(URL.api + URL.userIcons, data)
        .then((result) => {
           
        this.setState({ icons: result.data })})
        .then(() => this.getFolders(data))
        .catch(error => {console.log(error); this.Alert("Nie udało się pobrać danych.")});

    }

    getImages = (Id, folderId) => {
        this.setState({loadedIcons: false});
        //debugger;
        const data = {
            userId: Id,
            folderId: folderId
            
        };
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            }};
        
     axios.post(URL.api + URL.userImages, data)
        .then((result) => {
           
        this.setState({ images: result.data })})
        
        .catch(error => {console.log(error); this.Alert("Nie udało się pobrać danych.")});

    }


    /*  componentWillUpdate () {
    
 
      if(this.state.fetchFrom !== this.props.match.params.type )
      {
         
          this.setState({fetchFrom: this.props.match.params.type});
          console.log(this.state.fetchFrom);
          fetch("http://localhost:5000/api/radio/allradiosongs/" + this.state.fetchFrom )
         .then(res => res.json()).then((result) => this.setState({songs: result})).then(()=> this.setMaxCount());
         
      }
    
     } */


     getFolders = (data) => {
         if(data.folderId == "") {
            axios.post(URL.api + URL.userFolders, data)
            .then((result) => {
                
            this.setState({ folders: result.data })})
            .then(() => {
                this.manageIcons()})
            .catch(error => {console.log(error); this.Alert("Nie udało się pobrać danych.")});
             
         }
         else {
            this.setState({folders: []});
            this.manageIcons();
      }
     }


     scrollDown = () => {
       
    }


     scrollUp = () => {

 
    }


    manageIcons = () => {
        
        if(this.state.icons.length == 0 && this.state.folders.length==0) {
            //debugger;
            this.setState({ entityID: 'QRi3ULhyQq0'});
            this.setState({
                loadedIcons: true
              });
        }

        if (this.state.icons.length > 0 || this.state.folders.length>0) {
            //debugger;

        var youTube = "NU6qkVYxxVY";

        if(this.state.icons.length>0) {
            
            var note = document.getElementById(this.state.icons[this.state.icons.length - 1].id)
            //note.style.boxShadow = this.state.playedShadow;
            youTube = note.id;
            this.setState({ nowPlayed: note.id });
        }
        else {
            // here get last added song id
            var youTube = "NU6qkVYxxVY";
            
        }
        
        this.setState({ entityID: youTube });
        
       

        setTimeout(() => {
              this.setState({
                loadedIcons: true
              });
              var folders = document.getElementsByClassName("folder");
              var toPX = require('to-px');
              if(folders.length>0)
              {
                  for(var i=0;i<folders.length;i++)
                  {
                      folders[i].style.left = toPX(folders[i].style.left) + 'px';
                      folders[i].style.top = toPX(folders[i].style.top) + 'px';
                     
                  }
              }
          }, 2000)
            
        }

        /*var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        }
        var iconsc = document.getElementsByClassName("entity");
        for(var i=0; i<iconsc.length; i++) {
            iconsc[i].className = "entity1";
        } */

    }


    setSize = (c) => {
        if (c === 1) {
            return "30px";
        }
        if (c === this.state.maxCount && this.state.maxCount === 2) {
            return "50px";
        }
        if (this.state.maxCount === 1) {
            return "30px";
        }
        else {
            var result = ((50 * (c - this.state.maxCount)) / (this.state.maxCount - 1)) + 80;
            return result + 'px';
        }
    }

    nextSongHandler = () => {

        var randomInt = require('random-int');

        // here if icons/songs lenght==0 then take next song from databse
        var vidID = this.state.icons[randomInt(this.state.icons.length - 1)].id;
        this.setState({ entityID: vidID });
        var note = document.getElementById(vidID);

        note.style.boxShadow = this.state.playedShadow;

        var played = document.getElementById(this.state.nowPlayed);
        if (played !== null) {
            var prevId = this.state.nowPlayed;
            this.setState(prevState => ({
                prevPlayed: [...prevState.prevPlayed, prevId]
              }))
        }
        this.setState({ nowPlayed: vidID});
    }



    openFolder = (event) => {
        this.props.history.push('/profil/folder/' + event.target.id);
        //this.getIcons( this.props.userId, event.target.id);
    }



    onDbClick = (event) => {

        this.setState({imgField: false});
        this.setState({ytField: true});

        var played = document.getElementById(this.state.nowPlayed);
        if (played !== null) {
            var prevId = this.state.nowPlayed;
            this.setState(prevState => ({
                prevPlayed: [...prevState.prevPlayed, prevId]
              }))

        }
        this.setState({ nowPlayed: event.target.id });
        this.setState({ entityID: event.target.id });
        var note = document.getElementById(event.target.id)
        note.style.boxShadow = this.state.playedShadow;
    }

    onDbImgClick = (event) => {
        this.setState({imgField: true});
        this.setState({ytField: false});
        var played = document.getElementById(this.state.nowPlayed);
        if (played !== null) {
            var prevId = this.state.nowPlayed;
            this.setState(prevState => ({
                prevPlayed: [...prevState.prevPlayed, prevId]
            }))
            
        }
        this.setState({ nowPlayed: event.target.id });
        this.setState({ entityID: event.target.id });
        var note = document.getElementById(event.target.id)
        this.setState({imgSource: note.title});
        debugger;
        note.style.boxShadow = this.state.playedShadow;
    }



    onHover = (event) => {
        this.setState({idInMove: event.target.id});

        var entity = document.getElementById(event.target.id);

        var titleMain = entity.title.replace("||","<br/>");
        titleMain = titleMain.replace("||","<br/>");
        titleMain = titleMain.replace("||","<br/>");

        titleMain = this.getNiceHttp(titleMain);
        
        this.setState({ mainTitle: titleMain });
        var iconTitle = document.getElementById("258");
        document.getElementById("258").innerHTML = titleMain;
        iconTitle.innerHTML = titleMain;
        entity.style.transition = 'top 0s, left 0s';
        var opacity = entity.style.opacity;
        
    
        if(entity.id !==  this.state.hoveredId)
        {
        this.setState({ actuallOpacity: opacity })
        }
        this.setState({hoveredId: entity.id});

        document.getElementById(event.target.id).style.opacity = 1;
        
        dragElement(document.getElementById(event.target.id));

        function dragElement(elmnt, fold) {
            
            //localStorage.setItem('inMove', true);
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elmnt.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

                document.getElementById("saveIcons").className = "switch";

/*              var elTop = elmnt.offsetTop - pos2;
                var elLeft = elmnt.offsetLeft - pos1;

                var foldLeft0 = fold.style.left;
                var foldLeft1 = foldLeft0 + 65;

                var foldTop0 = fold.style.top;
                var foldTop1 = foldTop0 + 65;

                var vert =   elLeft < foldLeft1 && elLeft > foldLeft0
                var hori =   elTop < foldTop1 && elTop > foldTop0
                if(vert && hori)
                {
                    debugger;
                    elmnt.style.height = "2px";
                } */
                
                //var icon = this.state.icons.find(x => x.id === elmnt.id);
                //debugger;
            }

            function closeDragElement() {
           
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }

    onHoverFolder = (event) => {

        var entity = document.getElementById(event.target.id);
        var topp = entity.style.top;
  
        entity.style.transition = 'top 0s, left 0s';
        
        var opacity = entity.style.opacity;
        
        if(entity.id !==  this.state.hoveredId)
        {
            this.setState({ actuallOpacity: opacity })
        }
        this.setState({hoveredId: entity.id});
        
        document.getElementById(event.target.id).style.opacity = 1;
        
        dragElement(document.getElementById(event.target.id));
        
        
        function dragElement(elmnt) {
            
            //localStorage.setItem('inMove', true);
            
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elmnt.onmousedown = dragMouseDown;
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
            
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                document.getElementById("saveIcons").className = "switch";
                //localStorage.setItem('inMove', true);
            }
            
            function closeDragElement() {
                //debugger;
                //const inMove = localStorage.removeItem('inMove');
            
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    
}

    ////////////////////////////////////////////////

    cleanTitle = (event) => {
        this.setState({ mainTitle: "" });
        document.getElementById("258").innerHTML = "";
        var entity = document.getElementById(event.target.id);
        document.getElementById(event.target.id).style.opacity = this.state.actuallOpacity;

        var elTop = parseInt(entity.style.top, 10);
        var elLeft = parseInt(entity.style.left, 10);

        var fold = document.getElementsByClassName("folder");

        this.setIconLocationAfterMove(entity.id);
       // document.getElementById("saveIcons").className = "switch";

        if(fold.length>0)
        {  
            for(var i=0;i<fold.length;i++)
            {
            
                var foldLeft0 = parseInt(fold[i].style.left,10);
                var foldLeft1 = foldLeft0 + 40;
                
                var foldTop0 = parseInt(fold[i].style.top,10);
                var foldTop1 = foldTop0 + 40;
                
                var vert =   elLeft < foldLeft1 && elLeft > foldLeft0
                var hori =   elTop < foldTop1 && elTop > foldTop0
                //debugger;
                if(vert && hori)
                {
                    //debugger;


                    const data = {
                        Id: entity.id,
                        Type: "ICON",
                        UserId: this.props.userId,
                        ParentId: fold[i].id
                        }

                    axios.post(URL.api+URL.addToFolder, data)
                    .then((result) => {
                        this.updateFolderIcons(result.data.folder);
                        document.getElementById(result.data.entityId).className="disable";
                      //  document.getElementById("saveIcons").className = "switchDisable";
                        this.disableIconById(result.data.entityId);
                       // this.setIconLocationAfterMove(entity.id);
                    })
                    .catch(error => {console.log(error); alert("Server error.")});

                    //this.updateFolderIcons(fold[i].id, entity.id);
                   
                    //entity.style.display = "none";
                    break;
                }
            }

        }
       

            //var icon = this.state.icons.find(x => x.id === entity.id);
    }

    setIconLocationAfterMove = (Id) => {
        var icon = this.state.icons.find(x => x.id === Id);
        //debugger;
        if(!icon) {
            icon = this.state.newIcons.find(x => x.id === Id);
        }
        
        if(icon) {
            var iconCh = document.getElementById(icon.id);
            
            //debugger;
            icon.top = iconCh.style.top;
            icon.left = iconCh.style.left;
        }
    }

    removeIconById = (Id) => {
        //var array = [...this.state.icons];
       // var fIcon = array.find(x => x.id === Id);

       function checkId (icon) {
        return icon.id !== Id
       }
//debugger;
           this.setState( {icons:  [...this.state.icons].filter(checkId)});


           // delete this.state.icons[fIcon.id];
                 //if(fIcon)
                 //{
                     //var index = this.state.icons.indexOf(fIcon)
                     //array.splice(index, 1);
                     //this.setState({icons: array});
                 //}
            }

    disableIconById = (Id) => {

        var allIcons = [...this.state.icons, ...this.state.folders, ...this.state.images];

        var icon = allIcons.find( icon => icon.id === Id);
        if(icon) {
            //icon = this.state.folders.find( icon => icon.id === Id);
            icon.id = "dis";
        }
    }

    disableAddingIcon = (Id) => {
        var icon = this.state.newIcons.find( icon => icon.id === Id);
        icon.id = "dis";
    }

    disableAddingImage = (Id) => {
        var image = this.state.newImages.find(image => image.id === Id);
        image.id = "dis";
    }


    updateFolderIcons = (folder) => {
        this.setState(state => {
          const list = state.folders.map((item, j) => {
              debugger;
            if (item.id == folder.id) {
               item.icon0 = folder.icon0;
               item.icon1 = folder.icon1;
               item.icon2 = folder.icon2;
               item.icon3 = folder.icon3;
            }
          });
          return {
            list,
          };
        });
      };
       

    leaveFolder = (event) => {
        var entity = document.getElementById(event.target.id);
        document.getElementById(event.target.id).style.opacity = this.state.actuallOpacity;
    }
        

    rangeHandler = (event) => {
        var icons = document.getElementsByClassName("entity");
        debugger;
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.opacity = event.target.value / 100;
        }
    }

    editFolder = (event) => { 
    
        document.getElementById(event.target.id).defaultValue = event.target.value;
        var ttt = event.target.value;
    }


    addFolderHandler = () => {
     
        var name = document.getElementById("fol").value;
        const data = {
            Type: "FOLDER",
            UserId: this.props.userId,
            Title: name
            }

        axios.post(URL.api+URL.createFolder, data)
        .then((result) => {
          
            this.setState(prevState => ({
                folders: [...prevState.folders, result.data]
              }));
              document.getElementById("fol").value = "";
            })
        .catch(error => {this.Alert("Wystąpił błąd przy próbie utworzenia folderu.")}); 
    }

    addIconHandler = () => {

        this.setState({iconsFound: false});
        this.setState({noIconsFound: false});
        this.setState({searchingIcons: true});
      
     //this.props.startAdding();

        var exprwww = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(exprwww);
       
        var url = document.getElementById("iLink").value;

        const data = {
            UserId: this.props.userId,
            Title: url
            }
            
            if (url.match(regex)) {
                this.setState({wrongWWW: false});
                
                axios.post(URL.api+URL.findIcons, data)
                .then((result) => {
                    debugger;

                    if(result.data[0].id == "noFound") {
                        this.setState({noIconsFound: true});
                    }
                    else {

                        this.setState({ newIcons:
                            
                            Array.prototype.filter.call(result.data, function(icon){
                                return (icon.type).includes("YT");
                            })
                            
                        });
                        
                        this.setState({ newImages:
                            
                            Array.prototype.filter.call(result.data, function(icon){
                                return (icon.type).includes("IMG");
                            })
                            
                        });
                        
                        //this.props.setUrl(url);
                        this.setState({sourceUrl: url});

                     
                        setTimeout(() => {
                          this.setState({
                            iconsFound: true
                          });
                      }, 400)
                        
                        
                    }

                    })
                .catch(error => {this.Alert("Wystąpił błąd podczas wyszukiwania ikon.")});

            } else {
                this.setState({wrongWWW: true});
            }
     
  /*       this.setState(prevState => ({
            newIcons: [...prevState.newIcons, icon, icon1, icon2, icon3, icon4 ]
          })); */
//debugger;

          //if(this.state.newIcons.length==0 && this.state.newImages.length==0) {
            //this.setState({noIconsFound: true});
       // }
     

        


/*         axios.post(URL.api+URL.createFolder, data)
        .then((result) => {
          
            this.setState(prevState => ({
                folders: [...prevState.folders, result.data]
              }));
              document.getElementById("fol").value = "";
            })
        .catch(error => {this.Alert("Przepraszamy, wystąpił błąd przy próbie utworzenia folderu.")});  */
    }

        liveSearch = (event) => {  
        var icons = document.getElementsByClassName("entity");
        for (var i = 0; i < icons.length; i++) {
            if(icons[i].title.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            {
                icons[i].style.visibility = 'visible';
               // icons[i].style.filter = "";
               // icons[i].style.opacity = this.state.actuallOpacity;
            }
            else
            {
                icons[i].style.visibility = 'hidden';
                //icons[i].style.filter = "blur(5px)";
               // icons[i].style.opacity = 0.3;
            }
        }
    }

    backToDesktop = () => {
        this.props.history.push('/profil/pulpit');
    }


    saveIcons = () => {
        function checkPX(icon) {
            return  icon.style.top.include("px");
          }

       // var iconsClass = document.getElementsByClassName("entity");
        var folders = document.getElementsByClassName("folder");
        //var iconsClass = [...this.state.icons];
        var iconsClass = document.getElementsByClassName("entity");
        //var folders = [...this.state.folders];
        var icons = Array.prototype.filter.call(iconsClass, function(icon){
            return (icon.style.top).includes("px");
        });
 

        //icons.filter(checkPX);
        //debugger;
        var dataIcons = [];
        var toPX = require('to-px');

        for (var i = 0; i < icons.length; i++) {
            var topEl = icons[i].style.top; 
            var leftEl = icons[i].style.left;
       
            var top = ((parseFloat(topEl) / document.documentElement.clientHeight) * 100) +"vh";
            var left = ((parseFloat(leftEl) / document.documentElement.clientWidth) * 100) + "vw";
           
            icons[i].style.top = top;
            icons[i].style.left = left;
            var Id = icons[i].id;
            var icon = {
            UserId: this.props.userId,
            Type: "ICON",
            Id:  Id,
            Left: left,
            Top: top
           }
           dataIcons.push(icon);
        }

        for (var i = 0; i < folders.length; i++) {
            var leftfolder = folders[i].left;
            var top = ((parseFloat(folders[i].style.top) / document.documentElement.clientHeight) * 100)+"vh";
            var left = ((parseFloat(folders[i].style.left) / document.documentElement.clientWidth) * 100)+"vw";
            var Id = folders[i].id;
            debugger;
            var folder = {
             UserId: this.props.userId,
             Type: "FOLDER",
             Id:  Id,
             Left: left,
             Top: top
            }
            dataIcons.push(folder);
         }


         if(dataIcons.length>0) {
             
        axios.post(URL.api+URL.saveLocations, dataIcons) 
        .then((result) => {
            document.getElementById("saveIcons").className = "switchDisable";
            })
        .catch((error) => {this.Alert("Nie udało się zachować lokalizacji.")}); 
        }
        else {
            document.getElementById("saveIcons").className = "switchDisable";
        }
    }

    Alert = (message) => {
        this.props.serverAlert(message);
    }

    getHPosition = () => {
        var randomInt = require('random-int');
        return randomInt(101,200);
    }

    getWPosition = () => {
        var randomInt = require('random-int');
        return randomInt(-50,200);
    }


    showAddingIcon = () => {
        this.setState({addingIcon: true});
    }

    stopAdding = () => {
        document.getElementById("iLink").value = "";
        this.setState({addingIcon: false});
        this.setState({wrongWWW: false});
        this.setState({noIconsFound: false});
        this.setState({searchingIcons: false});
        this.setState({
            iconsFound: false
          });
        this.setState({newIcons: []});
        this.setState({newImages: []})
    }


    getShadow = (left, top, id) => {


        if(this.state.nowPlayed == id)
        {
            return this.state.playedShadow;
        }
        if(this.state.prevPlayed.includes(id)) {
            return this.state.prevShadow;
        }

        if(left<=50 && top<=50) {
            return "-1px 1px 3px 1px rgb(255, 255, 255)";
        }
        if(left>=50 && top<=50) {
            return "1px 1px 3px 1px rgb(255, 255, 255)";
        }
        if(left>=50 && top>=50) {
            return "1px -1px 3px 1px rgb(255, 255, 255)";
        }
        if(left<=50 && top>=50) {
            return "-1px -1px 3px 1px rgb(255, 255, 255)";
         }
    }

    getClass = (id) => {
        if (id !== "dis" && !this.state.addingIcon) {
            return "entity";
        }
        if (id == "dis") {
            return "disable";
        }
        if (this.state.addingIcon && id !== "dis") {
            return "entityDis";
        }
    }

    getFolderClass = (id) => {
        if (id !== "dis" && !this.state.addingIcon) {
            return "folder";
        }
        if (id == "dis") {
            return "disable";
        }
        if (this.state.addingIcon && id !== "dis") {
            return "folderDis";
        }
    }

    getNiceHttp = (address) => {
        var splitArr = address.split("//");
        if(splitArr.length > 1) {
            var reg = new RegExp("^www.");
            var reg1 = new RegExp("/$");

            var addr = splitArr[1];
            addr = addr.replace(reg, "");
            addr = addr.replace(reg1, "");

            if(addr.length>40)
            {
                addr = addr.substring(0, 40) + "...";
            }


            return addr;
        }
        else {
            return address;
        }
    }

    render(props) {

        var randomInt = require('random-int');
        //debugger;
        let icons = this.state.icons.map(song => {
            return (
                <YTIcon  remover={2}  isAuth={this.props.isAuthenticated} userId={this.props.userId}  title={song.title} yt={song.id} id={song.id}
                classname= {this.getClass(song.id)}
                    linkTo={this.onDbClick}
                    size={this.state.loadedIcons? '40px' : '0px' }
                    location={ this.state.loadedIcons? 
                      {boxShadow: this.getShadow(parseInt(song.left), parseInt(song.top), song.id), 
                        top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s'}:
                      {top: this.getHPosition(101,200)+'vh', left: this.getWPosition(-50,200)+'vw',
                   }}
                      //{top: 20+'vh', left: 20+'vw'}}
                    onHover={this.onHover}
                    onLeave={this.cleanTitle}
                    count={song.count}
                    fromFolder = {this.state.fromFolder}
                />
            )
        })

        let images = this.state.images.map(song => {
            return (
                <ImageIcon  remover={2}  isAuth={this.props.isAuthenticated} userId={this.props.userId}   yt={song.id} id={song.id}
                classname= {this.getClass(song.id)}
                    linkTo={this.onDbImgClick}
                    size={this.state.loadedIcons? '40px' : '0px' }
                    location={ this.state.loadedIcons? 
                      {boxShadow: this.getShadow(parseInt(song.left), parseInt(song.top), song.id), top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s' , width: "60px", height: "50px", borderRadius: '6px'} :
                      {top: this.getHPosition(101,200)+'vh', left: this.getWPosition(-50,200)+'vw',
                     }}
                      //{top: 20+'vh', left: 20+'vw'}}
                    title = {song.source}
                    source = {song.source}
                    onHover={this.onHover}
                    onLeave={this.cleanTitle}
                    count={song.count}
                    fromFolder = {this.state.fromFolder} 
                    newimage = {false}
                />
            )
        })


        let newImages = this.state.newImages.map(song => {
            return (
                <ImageIcon  remover={3}  isAuth={this.props.isAuthenticated} userId={this.props.userId}  title={song.title} yt={song.id} id={song.id}
                classname= { (song.id == "dis")? "disable":"entity"}
                    linkTo={this.onDbImgClick}
                    size={this.state.loadedIcons? '40px' : '0px' }
                    location={ this.state.iconsFound? 
                      {boxShadow: this.getShadow(parseInt(song.left), parseInt(song.top), song.id), top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s' , width: "60px", height: "50px", borderRadius: '6px'} :
                      {top: this.getHPosition(101,200)+'vh', left: this.getWPosition(-50,200)+'vw',
                     }}
                      //{top: 20+'vh', left: 20+'vw'}}
                    onHover={this.onHover}
                    onLeave={this.cleanTitle}
                    count={song.count}
                    title = {song.title}
                    source = {song.source}
                    fromFolder = {this.state.fromFolder} 
                    url = {this.state.sourceUrl}
                    folderId = {this.state.folderId}
                    newimage = {true}
                />
            )
        })




        let newIcons = this.state.newIcons.map(song => {

            return (
                <YTIcon  remover={3} isAuth={this.props.isAuthenticated} userId={this.props.userId}  title={song.title} yt={song.id} id={song.id}
                classname= { (song.id == "dis")? "disable":"entity"} 
                    linkTo={this.onDbClick}
                    size={this.state.iconsFound? '40px' : '0px' }
                    location={ this.state.iconsFound? 
                      {boxShadow: this.getShadow(parseInt(song.left), parseInt(song.top), song.id), top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s'}:
                      {top: this.getHPosition(101,200)+'vh', left: this.getWPosition(-50,200)+'vw'}}
                      //{top: 20+'vh', left: 20+'vw'}}
                    onHover={this.onHover}
                    onLeave={this.cleanTitle}
                    count={song.count}
                    fromFolder = {this.state.fromFolder}
                    folderId = {this.state.folderId}
                />
            )
        })

        let folders = this.state.folders.map(song => {
       
            return (
                        
                <Folder userId={this.props.userId}  title={song.title} yt={song.id} id={song.id}
                    classname= {this.getFolderClass(song.id)}
                    linkTo={this.openFolder}         
                    location={ this.state.loadedIcons? 
                    {boxShadow: this.getShadow(parseInt(song.left), parseInt(song.top), song.id), top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s'}:
                    {top: randomInt(101,200)+'vh', left: randomInt(-50,200)+'vw'}}
                    onHover={this.onHoverFolder}
                    onLeave={this.leaveFolder}
                    count={song.count}
                    icon0= {song.icon0}
                    icon1= {song.icon1}
                    icon2= {song.icon2}
                    icon3= {song.icon3}
                    
                    />
                     
                )
            })

        let addingInfo = this.state.wrongWWW?
        <div style={{color: 'red'}}> Nieprawidłowy adres www. </div> : "";

        let noIcons = this.state.noIconsFound?
        <div> Nie znaleziono nowych ikon.</div> : "";

        let iconsInfo = this.state.iconsFound?
        <div>Naciśnij <span class="addIconInfo">&#43;</span> przy wybranej ikonie aby dodać ją do pulpitu.</div> : "";

        let loading = (this.state.searchingIcons && !this.state.wrongWWW && !this.state.noIconsFound && !this.state.iconsFound)?
        (<div class="lds-ellipsiss"><div></div><div></div><div></div></div>) : "";


        let addingIcon = <div id="ownField" style={{display: this.state.addingIcon? 'block' : 'none'}} >
        <p>Dodaj nowe ikony z adresu www:</p>
        <div style={{display: "flex"}}>
        <input type="text" placeholder="Wklej link do zdjęć lub filmu YouTube" style={{width: "230px"}} id="iLink"/>
        <button class= { "popupButtton" } style={{fontSize: 12, padding: "4px",  width: '90px', marginLeft: "10px"}}  
        onClick={this.addIconHandler} >Znajdź ikony</button>
         <div title="Zakończ" class= { "stopAdding" }
        onClick={this.stopAdding}>&#43;</div>
        </div>
     <br/>
            <div style={{display: "flex"}}>
           {addingInfo}
           {noIcons}
           {iconsInfo}
           {loading}
        </div>
        </div>;


            let folderIcon = //window.location.href.includes("folder")? 
            this.state.fromFolder? 
            <div id="backFolder" onClick={this.backToDesktop} class="switch" style={{ position: 'fixed', right: '180px', bottom: '6px', zIndex: '300' }}> 
            <i class="icon-left-bold" />
            <div id="backFolderField" >
                    Wróć do głównego pulpitu.  
                </div>
            </div>
            :
            <div id="plus" class="switch" style={{ position: 'fixed', right: '180px', bottom: '6px', zIndex: '300' }}  title="Dodaj nowy folder"> 
            <i class="icon-folder-add" />
            <div id="plusField" >
            <p>Utwórz nowy folder o nazwie:</p>
            <div style={{display: "flex"}}>
            <input type="text" style={{width: "105px"}} id="fol"/>
            <button class="popupButtton" style={{fontSize: 12, padding: "4px", marginLeft: "10px"}}  onClick={this.addFolderHandler} >Dodaj</button>
                </div>
            </div>
            </div>;

            let addOwn =
            <div id="addOwn" class="addOwn" onClick={this.showAddingIcon} style={{ position: 'fixed', right: '210px', bottom: '6px', zIndex: '300' }}> 
           &#43;
           <div id="addText" >
                    Dodaj nowe ikony.  
                </div>
            </div>

            let field = "";

            if(this.state.ytField)
                field = <Field play={this.state.entityID} show={this.state.loadedIcons} nextSong={this.nextSongHandler} loadText={this.props.fetchData} />

            if(this.state.imgField)
                field = <ImageField src={this.state.entityID} sourceShow={this.getNiceHttp(this.state.imgSource)} 
                source={this.state.imgSource}
                show={this.state.loadedIcons} nextSong={this.nextSongHandler}/>



            return (
                
            <div className="area">
        
            <div> <input id="ls" onChange={this.liveSearch} placeholder="Wyszukaj..." class="switchSearch" type="text"/></div>
            {folderIcon}
            {addOwn}
            <div id="saveIcons" class="switchDisable" onClick={this.saveIcons} style={{ position: 'fixed', right: '155px', bottom: '6px', zIndex: '300' }} >
             <i class="icon-floppy" />
             <div id="saveIconsField"  >
                    Zapamiętaj aktualne ulokowanie ikon.  
                </div>
            </div>

            <div id="prop" class="switch" style={{ position: 'fixed', right: '130px', bottom: '6px', zIndex: '300' }} >
             <i class="icon-cog" />
                <div id="propField"  >
                    <p>Jasność ikon:</p>
                    <input type="range" id="s"
                        onChange={this.rangeHandler} />
                       
                </div>
            </div>

              {field}

                <div id = "258" class="titleDiv"> </div>
               
                {icons}
                {folders}
                {images}
                {newIcons}
                {newImages}
                {addingIcon}
                

               <div class="containerIconsContainer">
               <div class="iconsContainer">
                </div>
                </div>
            
            </div>
        );
    }  
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.userId !== null,
      userId: state.auth.userId,
      addingIcon: state.auth.addingIcon,
      removedId: state.auth.removingIconId,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        serverAlert: (message) => dispatch(showServerPopup(message)),
        stopAdding: () => dispatch(stopAddingIcon()),
        stopRemoving: () => dispatch(stopRemovingIcon())
    };
};
//export default UserDesktop;

export default connect(mapStateToProps, mapDispatchToProps)(UserDesktop);


