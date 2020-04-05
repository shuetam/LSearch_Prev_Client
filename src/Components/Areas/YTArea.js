import React, { Component } from 'react';
import '../../App.css';
import './Area.css';
import Header from '../Header/Header';
import Field from '../Fields/Field';
import { Link, Route, NavLink } from 'react-router-dom';
import YTIcon from '../Icons/YTIcon';
import LoadingField from '../Fields/LoadingField';
import { BrowserRouter } from 'react-router-dom';
import randoom from 'random-int';
import axios from '../../axios-song';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
//import {scrollU, scrollD} from '../../Store/Actions/scroll';
import { connect } from 'react-redux';
import {showServerPopup, manageScreen} from '../../Store/Actions/auth';
import {URL} from '../../environment'



class YTArea extends Component {

    constructor(props) {
        super(props);

        /* fetch(this.props.fetchData )
        .then(res => res.json()).then((result) => this.setState({songs: result})).then(()=> this.setMaxCount());
        
 */



        this.state = {

            mainTitle: ".",
            loaded: false,
            intervalSong: null,
            maxCount: null,
            ytCount: null,
            fetchFrom: null,
            hoveredId: "",
            ytID: "",
            actuallOpacity: 0.4,
            nowPlayed: "",
            playedShadow: '#FFF 0px 0px 5px, 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), #FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 10px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgb(255, 45, 45) 0px 0px 15px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 20px, rgb(255, 45, 45) 0px 0px 2px 5px',
            prevShadow: '#FFF 0px 0px 5px, 0px 0px 3px 1px rgb(255, 255, 255), 0px 0px 3px 1px rgb(255, 255, 255), #FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px,#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgba(231, 173, 64, 0.637) 0px 0px 20px 10px,  rgba(231, 173, 64, 0.637) 0px 0px 10px, rgba(231, 173, 64, 0.637) 0px 0px 10px, rgba(231, 173, 64, 0.637) 0px 0px 20px, rgba(231, 173, 64, 0.637) 0px 0px 2px 5px',
            inMove: false,
            iconsType: "",
            icons: [],
            userIconsId: [],
            prevPlayed: [],
            noIcons: false,
        }
    }

  //  playedShadow: '#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 5px, rgb(255, 45, 45) 0px 0px 30px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 10px, rgb(255, 45, 45) 0px 0px 20px, rgb(255, 45, 45) 0px 0px 2px 5px',


    componentDidMount() {

        if(this.props.fetchData.includes("movie"))
        {
            this.setState({iconsType: "movie"})
        }
        if(this.props.fetchData.includes("radio"))
        {
            this.setState({iconsType: "radio"})
        }



        fetch(this.props.fetchData).then(res => res.json()).then((result) =>
            this.setState({ icons: result })).then(() =>
                this.setMaxCount()).catch(() => {this.Alert("Wystapił błąd. Brak odpowiedzi serwera. Spróbuj ponownie później."); 
                this.setState({
                    loaded: true
                })}); 

        this.getUserIconsId();
        console.log(this.state.icons);
        
}

    componentWillUpdate() {

    }

    Alert = (message) => {
        this.props.serverAlert(message);
    }

     getUserIconsId = () => {

     if(this.props.isAuthenticated) {
        /* let data = {
            UserId: this.props.userId
        } */
        
        var config = {
            headers: {Authorization: "Bearer " + this.props.jwtToken}
        }
        axios.post(URL.api+URL.userIconsIds, null, config)
        .then((result) => {
           // debugger;
            this.setState({ userIconsId: result.data })});
        //.catch(error => {this.Alert()}); 
        }
    }

/*      sccrollUp = () => {
        //debugger;
        scrollU(); }

        scrollDown = () => {
            //debugger;
            scrollD(); } */
            //https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=tCXGJQYZ9JA&key=AIzaSyC2s9N7qsU48BL83Zaj-OCE6pqpvtTsxtM
//https://www.googleapis.com/youtube/v3/playlists


    setMaxCount = () => {
        if (this.state.icons.length > 0) {
            var counts = [];
            this.state.icons.map(song => { counts.push(parseInt(song.count)) });
            var max_Count = Math.max(...counts);
            this.setState({ maxCount: max_Count });

            this.setState({ ytID: this.state.icons[this.state.icons.length - 1].id });
           // this.setState({ mainTitle: this.state.songs[this.state.songs.length - 1].title })

            var note = document.getElementById(this.state.icons[this.state.icons.length - 1].id)

            if(note.id.includes("Error")) {
                this.nextSongHandler();
            }
            else {
                this.setState({ nowPlayed: note.id });
                this.setState({ ytID: note.id });
            }

            note.style.boxShadow = this.state.playedShadow;

            setTimeout(() => {
              this.setState({
                  loaded: true
              });
              var icons = document.getElementsByClassName("entity");
          }, 0)
            
        }
        else {
            this.setState({ noIcons: true,  loaded: true });
        }

    }

    setSize = (c) => {
        if(this.state.iconsType === "movie") {
            return this.setSizeMovie(c);
        }
        if(this.state.iconsType === "radio") {
            return this.setSizeSong(c);
        }
    }


    setSizeSong = (c) => {
        if (c === 0) {
            return "30px";
        }
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
            var result = (((30 * (c - this.state.maxCount)) / (this.state.maxCount - 1)) + 80);
            return result + 'px';
        }
    }

    setSizeMovie = (c) => {
        return 0.85*c + 'px'
    }

    nextSongHandler = () => {

        var randomInt = require('random-int');
        var index = randomInt(this.state.icons.length - 1);
        var vidID = this.state.icons[index].id;

        if(vidID.includes("Error") && index !== 0 ) {
            this.nextSongHandler();
        }
        else {
        this.setState({ ytID: vidID });
        var note = document.getElementById(vidID);

        note.style.boxShadow = this.state.playedShadow;

        var played = document.getElementById(this.state.nowPlayed);
        if (played !== null) {
            var prevId = this.state.nowPlayed;
            this.setState(prevState => ({
                prevPlayed: [...prevState.prevPlayed, prevId]
              }))
        }
        this.setState({ nowPlayed: note.id });
    }
    }



    onDbClick = (event) => {

          var proops = this.state.userIconsId;
       
        var played = document.getElementById(this.state.nowPlayed);
        if (played !== null) {
            //played.style.boxShadow = this.state.prevShadow;
            //played.style.filter = "blur(5px)";
            var prevId = this.state.nowPlayed;
            this.setState(prevState => ({
                prevPlayed: [...prevState.prevPlayed, prevId]
              }))
            
        }
        this.setState({ nowPlayed: event.target.id });
        this.setState({ ytID: event.target.id });
        var note = document.getElementById(event.target.id)
        note.style.boxShadow = this.state.playedShadow;
    }


    onHover = (event) => {

       // console.log( localStorage.getItem('inMove'));

        var entity = document.getElementById(event.target.id);


        
        var titleMain = entity.title.replace("||","<br/>");
        titleMain = titleMain.replace("||","<br/>");
        titleMain = titleMain.replace("||","<br/>");
        titleMain = titleMain.replace("||","<br/>");
        
        this.setState({ mainTitle: titleMain });
        var iconTitle = document.getElementById("258");
        document.getElementById("258").innerHTML = titleMain;
        iconTitle.innerHTML = titleMain;
        //debugger;
        entity.style.transition = 'top 0s, left 0s';
        
/*         while (typeof iconTitle == 'undefined') {
            console.log("HOOOVERRR!!");
            iconTitle =  document.getElementById("258");
            iconTitle.innerHTML = entity.title;

        } */

/*         var iconTitle1 = document.getElementById("258");
        //iconTitle.style.color = "rgba(235, 235, 235, 0.836)";
        iconTitle1.innerHTML = entity.title;
        var iconTitle2 = document.getElementById("258");
        iconTitle2.innerHTML = entity.title; */

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
               // localStorage.setItem('inMove', true);
            }

            function closeDragElement() {
                //debugger;
                //const inMove = localStorage.removeItem('inMove');
               // localStorage.setItem('inMove', false);
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }

    ////////////////////////////////////////////////



    userOwner = (id) => {
        return  this.state.userIconsId.includes(id);
    }


    cleanTitle = (event) => {
     
        this.setState({ mainTitle: "" });
         document.getElementById("258").innerHTML = "";
       
            document.getElementById(event.target.id).style.opacity = this.state.actuallOpacity;
        
    }

    rangeHandler = (event) => {
        var icons = document.getElementsByClassName("entity");
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.opacity = event.target.value / 100;
        }
    }

    liveSearch = (event) => {  
        var icons = document.getElementsByClassName("entity");
        for (var i = 0; i < icons.length; i++) {
            if(icons[i].title.toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            {
                icons[i].style.visibility = 'visible';
               // icons[i].style.filter = "blur(0px)";
            }
            else
            {
                icons[i].style.visibility = 'hidden';
                   //icons[i].style.opacity = 0.3;
   
            }
        }
    }

    getShadow = (left, top, id) => {

        var entity = document.getElementById(id);

        if(entity) {
            var top_ = entity.style.top;
            var left_ = entity.style.left;
            if(top_.includes("px")) {
                top = ((parseFloat(top_) / document.documentElement.clientHeight) * 100); 
                left = ((parseFloat(left_) / document.documentElement.clientWidth) * 100); 
            }
        }
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

 

    render(props) {
        var randomInt = require('random-int');

let field = "";
        if(!this.state.loaded) {
            field = <LoadingField/>
        }
        else {
            field = <Field play={this.state.ytID} noIcons={this.state.noIcons} fromDesktop={false} show={this.state.loaded} nextSong={this.nextSongHandler} loadText={this.props.fetchData} />

        }

        let icons = this.state.icons.map(song => {
//tu 1 bedzie dla tych ktore user ma juz na pulpicie i bedzie removeentity bez znikania
// zapis do bazy zawsze z vh i vw - przy dodaniu ikony brac z bazy, przy aktualizacji pozycji przeliczac z px na vh vw
            return (
                <YTIcon  remover={this.userOwner(song.id)? 1 : 0} isAuth = {this.props.isAuthenticated}   title={song.title} yt={song.id} id={song.id}
                    linkTo={this.onDbClick}
                    classname="entity"
                    size={this.setSize(parseInt(song.count)) }
                    location={ this.state.loaded? 
                      {boxShadow: this.getShadow(parseInt(song.left),parseInt(song.top), song.id), top: song.top, left: song.left, transition: 'top '+2+'s, left '+2+'s'}:
                      {top: randomInt(101,200)+'vh', left: randomInt(-50,200)+'vw'}}
                    onHover={this.onHover}
                    onLeave={this.cleanTitle}
                    count={song.count}
                />
            )
        })

        

            return (
                
                <div>

     
            <div> <input id="ls"  onChange={this.liveSearch} placeholder="Wyszukaj..." class="switchSearch" type="text"/></div>
            <div id="prop" class="switchB" style={{ position: 'fixed', right: '130px', bottom: '6px', zIndex: '300' }} > <i class="icon-cog" />
                <div id="propField">
                <p/>
                <hr/> 
                    <div>Jasność ikon:</div>
                    <input type="range" id="s"
                        onChange={this.rangeHandler} />
               <hr/> 
               {/*  <p/>
                    <div class="switchScreen" onClick={this.screenManage}><i style={{fontSize: "20px" }} class={this.isFullScreen()? "icon-resize-small-alt" : "icon-resize-full-alt"}/>
                    {!this.isFullScreen()? "Aktywuj pełny ekran" : "Zamknij pełny ekran"}</div>
                  <hr/>  */}
                </div>
            </div>
                 
                    {field}
                <div id = "258" class= "titleDiv"> </div>
               
                {icons}

    <div class="containerIconsContainer">
               <div class="iconsContainer">
               
                </div>
                </div>



         
            </div>
        );
    }  
}

const mapDispatchToProps = dispatch => {
    return {

        serverAlert: (message) => dispatch(showServerPopup(message)),
       

    };
};

const mapStateToProps = state => {
    
    return {
        isAuthenticated: state.auth.jwttoken !== null,
        //userId: state.auth.userId,
        jwtToken: state.auth.jwttoken,
        //fullScreen: state.auth.fullScreen
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YTArea);

