
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
//import "../../Fontello/css/fontello.css";
//import "../../icon/css/fontello.css";
import "../../Icons/css/fontello.css";
//import "../../Icons1/css/fontello.css";
import { Link, Route, NavLink, BrowserRouter, Switch } from 'react-router-dom';
import YTArea from '../Areas/YTArea';
import YTAreaAdmin from '../Admin/YTAreaAdmin';
import BestSellers from '../Areas/BestSellers';
import Field from '../Fields/Field';
import Policy from '../Informations/Policy';
import Contact from '../Informations/Contact';
import Information from '../Informations/Information';
import Popup from '../Popup/Popup';
import ServerPopup from '../Popup/ServerPopup';
import First from '../../First';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import {authLogin, authLogout, showServerPopup, escManage, manageScreen} from '../../Store/Actions/auth';
import FacebookLogin from 'react-facebook-login';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
//import {scrollU, scrollD} from '../../Store/Actions/scroll';
import UserDesktop from '../Areas/UserDesktop';
import axios from 'axios';
import {URL, PATHES} from '../../environment';




var fetchData = "";
var opacity = 0.4;
var  movieChecked = true;

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

            takeSongDataFrom: URL.api + URL.randomSongs,
            takeMovieDataFrom: URL.api + URL.tvMovies,
            opacity: 0.4,
            takeAllErrors: false,
            showCookie: true,
            cookieLeft: "-450px",
            showInfoArrow: true,
            isFullScreen: false
        }
    }

    componentDidMount() {
       // console.log("PARAMS");
       // console.log(this.props);
        //debugger;

  /*      */
        //document.addEventListener("keydown", this.escFunction, false);
        this.manageFullScreenState();
        document.addEventListener('fullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('mozfullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('webkitfullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('msfullscreenchange', this.manageFullScreenState, false);

    
        var cookieAkcept = localStorage.getItem("cookieAkcept");

        var disableArrows = localStorage.getItem("disableArrows");

        if(disableArrows == 1){
            this.setState({showInfoArrow: false});
        }

        if(cookieAkcept == 1){
            this.setState({showCookie: false});
        }
        else {
            this.setState({showCookie: true});
            this.animatedCookie();
        }
    
        if(!this.props.isAuthenticated) {

            var facebooks = document.getElementsByClassName("loginBtn loginBtn--facebook");
            for(var i=0;i<facebooks.length;i++) {
                document.getElementsByClassName("loginBtn loginBtn--facebook")[i].innerHTML = "Zaloguj przez Facebook";
            }
        }
        this.liveResponsive();
        //window.addEventListener('resize', this.liveResponsive);
// EVENT LISNER ONLY IN FIRST COMPONENT!!!
        
    }

    componentWillUnmount() {
        this.manageFullScreenState();
        //document.removeEventListener("keydown", this.escFunction, false);
        document.addEventListener('fullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('mozfullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('webkitfullscreenchange', this.manageFullScreenState, false);
        document.addEventListener('msfullscreenchange', this.manageFullScreenState, false);

      }




    componentDidUpdate() {
        //debugger;

        if(!this.props.isAuthenticated) {
            var facebooks = document.getElementsByClassName("loginBtn loginBtn--facebook");
            for(var i=0;i<facebooks.length;i++) {
                document.getElementsByClassName("loginBtn loginBtn--facebook")[i].innerHTML = "Zaloguj przez Facebook";
            }
        }
    } 

    Main = () => {
     //window.location.replace("/");
     this.props.history.push('/');
    }

    myDesktop = () => {
        this.props.history.push(PATHES.userPulpit);
    }

    hideArrows = () => {
        this.setState({showInfoArrow: false});
        localStorage.setItem("disableArrows", 1);
    }

    acceptCookies = () => {
        this.setState({showCookie: false});
        localStorage.setItem("cookieAkcept", 1);
    }

    animatedCookie = () => {
        setTimeout(() => {
         
            this.setState({
                cookieLeft: '50px'
            })
        }, 1000)
    }

    manageFullScreenState = () => {

        //this.Alert("I detect screen change");
       
            if((window.fullScreen) ||
            (window.innerWidth == window.screen.width && window.innerHeight == window.screen.height)) {
                this.setState({isFullScreen: true});
            }
            else {
                this.setState({isFullScreen: false});
            }
    }

    screenManage = () => {
        this.props.screenManage();
    }


    liveResponsive = () => {
       //this.Alert(window.innerWidth + "");
       if(window.innerWidth < 760) {
            this.setState({responsive: true});
       }
       else {
        this.setState({responsive: false});
       }
    }

    socialLogin = (name, email, image, token) => {
    const data = {
        Email: email,
        Token: token
    };
   /*  const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }}; */
    
    axios.post(URL.api+URL.login, data)
    .then(response => {
       // console.log(response);
        debugger;

        if(response.data == "error") {
            this.Alert("Wystąpił błąd przy próbie zalogowania.");
        }
        else {
            debugger;
            this.props.SocialLog(response.data.userId, name, image, response.data.jwtToken, response.data.role);
        }
    }).catch(error => { this.Alert("Wystąpił błąd.")});
}
        
    responseGoogle = (response) => {
        debugger;
        if(!this.props.isAuthenticated) {
        
            this.socialLogin(response.profileObj.name, response.profileObj.email, response.profileObj.imageUrl, "G_"+response.tokenId);
         
            //this.props.SocialLog( response.profileObj.givenName, response.profileObj.imageUrl, response.tokenId);
        }
        //console.log(response);
    }

    responseFacebook  = (response) => {
       //console.log(response);
       debugger;
       if(!this.props.isAuthenticated) {
      
           this.socialLogin(response.name, response.email, response.picture.data.url, "F_"+response.accessToken);
         
           //this.props.SocialLog( response.name, response.picture.data.url, response.accessToken ); 
        }
    }

     logOut =() => {
         this.props.Logout();
         //document.getElementById("login").id = "another";
         window.location.replace("/");
    }

    Alert = (message) => {
        this.props.serverAlert(message);
    }

    clickCheckBox = () => {

        var stateCount = 0;


        for (var i = 1; i < 8; i++) {
            document.getElementById(i).disabled = false;
            //////here
            if (document.getElementById(i).checked) {
                document.getElementById(i+'a').style.color='rgba(231, 173, 64, 0.637)';
                stateCount = stateCount + 1;
                if (stateCount === 3) {

                    for (var i = 1; i < 8; i++) {
                        if (document.getElementById(i).checked === false) {

                            document.getElementById(i).disabled = true;
                        }
                    }
                }
            }
            else {
                document.getElementById(i+'a').style.color='rgba(255, 255, 255, 0.678)';
            }
        }
        var fetchFrom = "";

        for (var i = 1; i < 8; i++) {
            if (document.getElementById(i).checked) {
                fetchFrom = fetchFrom + document.getElementById(i).name;
            }
        }

         fetchData = URL.api + URL.radioSongs + fetchFrom;
    
        if (fetchFrom === "") {
            fetchData = URL.api + URL.randomSongs; 
        }
        //this.setState({ takeSongDataFrom: fetchData });
    }


   // scrollDown = () => {
            //debugger;
            //scrollD();
/*         if(localStorage.getItem('inMove')=='false') {
            
            var songs = document.getElementsByClassName("entity");
            var initialLocations = [];
            for (var i = 0; i < songs.length; i++) {
                //console.log(songs[i].style.top);
                songs[i].style.transition = 'top '+2+'s, left '+2+'s'
                initialLocations.push({ 'top': songs[i].style.top, 'left': songs[i].style.left });
            }
            
            for (var i = 1; i < songs.length; i++) {
                songs[i-1].style.top = initialLocations[i].top;
                songs[i-1].style.left = initialLocations[i].left;
            }
        } */
        //console.log(initialLocations);
   // } 

/*     scrollUp = () => {
        scrollU();
    } */


    showSongs = () => {

       // document.getElementById("s").value = 50;
        //console.log("Fetch data when clicked:  " + fetchData);
        
        this.setState({ takeAllErrors: false });
        this.setState({ takeSongDataFrom: fetchData });
        if(this.props.isAdmin)
        {
            var adminBox = document.getElementById("adminBox");
            if(adminBox.checked) {
                debugger;
                this.setState({ takeAllErrors: true });
            }
            else {
            }
        }


        if(this.props.isAdmin) {
            this.props.history.push(PATHES.songsAdmin);
        }
        else {
            this.props.history.push(PATHES.songs);
        }
    };

    openLink = (event) => {
        this.props.history.push(event.target.id);
    }


        showBooks = () => {
            this.props.history.push(PATHES.bestsellers);
        }

    showMovies = () => {
        this.setState({ takeAllErrors: false });
        var moviesUrl = URL.api+URL.tvMovies;
        var cinema = document.getElementById("cBox");
        var tvmovies = document.getElementById("tvBox");
        if(cinema.checked)
        {
            moviesUrl = URL.api+URL.tvMovies;
        }
        if(tvmovies.checked)
        {
            moviesUrl = URL.api+URL.tvMovies;
        }
        this.setState({takeMovieDataFrom: moviesUrl});
        
        if(this.props.isAdmin) {
            this.props.history.push(PATHES.moviesAdmin);
        }
        else {
            this.props.history.push(PATHES.movies);
        }
            

    }

    clickTV = () => {
  
        var box = document.getElementById("tvBox");
        if(box.checked) {
            document.getElementById('1m').style.color = 'rgba(231, 173, 64, 0.637)';
            document.getElementById('bM').className = "filmButtton";
            //movieChecked = true;
        }
        else {
            document.getElementById('1m').style.color = 'rgba(255, 255, 255, 0.842)';
            document.getElementById('bM').className = "filmButttonEnabled";
        }

        
        var box1= document.getElementById("cBox");
        box1.checked = false;
        document.getElementById('2m').style.color = 'rgba(255, 255, 255, 0.842)';
        document.getElementById('cityTab').style.display = 'none';
    }


    clickBestsellers = () => {
  
        var box = document.getElementById("bookBox");
        if(box.checked) {
            document.getElementById('1b').style.color = 'rgba(231, 173, 64, 0.637)';
            document.getElementById('bB').className = "bookButtton";

        }
        else {
            document.getElementById('1b').style.color = 'rgba(255, 255, 255, 0.842)';
            document.getElementById('bB').className = "bookButttonEnabled";
        }
    }

    clickCinema = () => {
  
        var box = document.getElementById("cBox");
        if(box.checked) {
            document.getElementById('2m').style.color = 'rgba(231, 173, 64, 0.637)';
            document.getElementById('bM').className = "filmButtton";
            document.getElementById('cityTab').style.display = 'block';
        }
        else {
            document.getElementById('2m').style.color = 'rgba(255, 255, 255, 0.842)';
            document.getElementById('bM').className = "filmButttonEnabled";
            document.getElementById('cityTab').style.display = 'none';
        }
        var box1 = document.getElementById("tvBox");
        box1.checked = false;
        document.getElementById('1m').style.color = 'rgba(255, 255, 255, 0.842)';
    }
    
    render() {
    
        let cheec = movieChecked;
        let userDesktop = null;
        let userFolder = null;
        let loginPanel = null;

    let infoArrow = this.state.showInfoArrow? <div onMouseOver={this.hideArrows} class="infoArrow"><i class="icon-left-bold" />
    <span style={{fontSize: "13px"}}>Zapoznaj się z info.</span></div> : "";

let infoArrowBest = this.state.showInfoArrow? <div onMouseOver={this.hideArrows} class="infoArrowBestsellers"><i class="icon-left-bold" />
<span style={{fontSize: "13px"}}>Zapoznaj się z info.</span></div> : "";

    let movies = 
       <Route path={PATHES.movies} exact component={(props)=> (
             <YTArea {...props} fetchData = {this.state.takeMovieDataFrom} />
         )} />;
        
let first =  <Route path={'/'} exact component={First} />

    let songs =  <Route path={PATHES.songs} exact component={(props) => (
            <YTArea {...props} fetchData={this.state.takeSongDataFrom} />
        )} />;

    let books = <Route path={PATHES.bestsellers} exact component={(props) => (
            <BestSellers {...props} fetchData={URL.api + URL.bestsellers} />
        )} />;

        let policy = <Route path={PATHES.policy} component={(props) => (
            <Policy/> )} />;

            let contact = <Route path={PATHES.contact} component={(props) => (
                <Contact/> )} />;

                let information = <Route path={PATHES.information} component={(props) => (
                    <Information/> )} />;

    ///////////////////////////////////////////////
    let moviesAdmin = 
    <Route path={PATHES.moviesAdmin} exact component={(props)=> (
        <YTAreaAdmin {...props}  takeAllErrors = {this.state.takeAllErrors}  fetchData = {this.state.takeMovieDataFrom} />
    )} />;

    let songsAdmin =  <Route path={PATHES.songsAdmin} exact component={(props) => (
        <YTAreaAdmin {...props}   takeAllErrors = {this.state.takeAllErrors}  fetchData={this.state.takeSongDataFrom} />
    )} />;
    ///////////////////////////////////////////////

    let cookieInfo = this.state.showCookie? 
    <div class="cookieInfo" style={{ left: this.state.cookieLeft }}>
        Strona Livesearch.pl wykorzystuje pliki cookies.<br/> 
        Korzystając z serwisu wyrażasz zgodę na ich używanie.<br/>
        Plikami cookies możesz zarządzać w ustawienia przeglądarki.<br/>
        Więcej informacji znajdziesz w naszej <span onClick={this.openLink} id={PATHES.policy} style={{fontSize: "11px"}} class="switchHref">Polityce prywatności.</span>
     <button class="cookieButtton" onClick={this.acceptCookies}>Akceptuje</button>
                   
    </div> : "";

    let loginButtons = <div> <GoogleLogin
    clientId="565898203972-ai9uh3sbj7iuitggtaaa1en172jvmd9r.apps.googleusercontent.com"
    buttonText="Zaloguj przez Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    
    cookiePolicy={'single_host_origin'}/>
    <br></br>
    <p/>
    <p/>
          <FacebookLogin
            appId="2395943984012670"
            autoLoad={false}
            fields="name,email,picture"
            cssClass="loginBtn loginBtn--facebook"
            callback={this.responseFacebook}/></div>;



        //if(this.props.isAuthenticated) {
            userDesktop = (<Route path={PATHES.userPulpit} component={(props) => (
                <UserDesktop {...props} />
            )} />);

            userFolder = (<Route path={PATHES.userFolder + ':fid?'} component={(props) => (
                <UserDesktop {...props} />
            )} />);
        //} 
        //else {
         //  loginPanel = <div class="loginPanel"> {loginButtons}</div>
       // }





let authenticate = (<div class="logIn" id="userP"> Zaloguj się
<div id="login" class="social"> 
{loginButtons}
</div>
</div>);

let screenSwitch = <div id="screenS"  class="screenSwitch" onClick={this.screenManage}><i style={{fontSize: "20px" }} class={this.state.isFullScreen? "icon-resize-small-alt" : "icon-resize-full-alt"}/>
   <div id="screenField"> {this.state.isFullScreen?  "Zamknij pełny ekran" :  "Aktywuj pełny ekran"}       </div>
</div>

let adminCheck = this.props.isAdmin? <input name="adminB" type="checkbox" id="adminBox" /> : "";
//let url = 'https://lh5.googleusercontent.com/-fM22zCVGNzY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2KVOJS8-bzXw0bRyHnScQ_eqykA/s96-c/photo.jpg';
let userPanel = (<div class="logIn" id="userP">
{adminCheck}
<span style={{position: 'relative', top: -3}}> {this.props.isAdmin?  
 "ADMIN" : ""}</span>
 <img  id="imageGoogle" src={this.props.imageUrl}></img> <span style={{position: 'relative', top: -3}}>{this.props.userName}</span>
<div id="login"> <div class="desktop" onClick={this.myDesktop}>Mój pulpit</div> <div class="desktop" style={{fontSize: 12}}  onClick={this.logOut}>Wyloguj</div> </div>
</div>);

//let userHeader = (<div class="logIn" style={{position: "relative"}}  id="userP"><div  class="lds-ellipsis"><div></div><div></div><div></div></div></div>);

let userHeader = this.props.isAuthenticated ? userPanel :  authenticate;

let infoForSmall = <div class="menuForSmall"> Wersja strony dla małego okna przegladarki i urządzeń mobilnych jest w przygotowaniu.</div> 
    

        let mainMenu =  (<div class="menu"> 
            <div id="music" class="switch">
                <i class="icon-note" />
                Muzyka
                <div id="radio">

                    <div class="headHeader">Utwory grane w ostatnich 12h w:</div>
                    <div  id="infoLink">&#9432;info
                <div id="info">
                                Utwory prezentowane są przez ikony - wielkość ikon uzalenione są od
                                łącznej ilości odtworzeń utworu w wybranych stacjach radiowych.
                                Początkowe ulokowanie ikon jest losowe - ich poło&#380;enie mo&#380;esz dowolnie
                                zmieniać. Aby odtworzyć dany utwór kliknij dwukrotnie na jego ikonę.
                                <p>W jednym czasie mo&#380;esz wizualizować dane z maksymalnie 3 stacji radiowych.</p>
                                <p>W przypadku braku zaznaczenia jakichkolwiek stacji, system wylosuje i zaprezentuje 70 utworów (po 10 z ka&#380;dego radia). </p>
                            </div>
                        </div>

                             {infoArrow}
                                  
                    <p> <label id="1a" onClick={this.clickCheckBox}>
                        <input name="rmf_" type="checkbox" id="1" />
                        Rmf
                        </label>
                    </p>

                    <p> <label id="2a" onClick={this.clickCheckBox}>
                        <input name="zet_" type="checkbox" id="2" />
                        Radio Zet
                        </label>
                    </p>

                    <p> <label id="3a" onClick={this.clickCheckBox} >
                        <input name="rmfmaxx_" type="checkbox" id="3" />
                        Rmf Maxx
                        </label>
                    </p>

                    <p> <label id="4a" onClick={this.clickCheckBox} >
                        <input name="eska_" type="checkbox" id="4" />
                        Eska
                        </label>
                    </p>

             {/*        <p> <label id="5a" onClick={this.clickCheckBox} >
                        <input name="plus_" type="checkbox" id="5" />
                        Radio Plus
                        </label>
                    </p> */}

                    <p> <label id="5a" onClick={this.clickCheckBox} >
                        <input name="vox_" type="checkbox" id="5" />
                        Vox
                        </label>
                    </p>

                    <p> <label id="6a" onClick={this.clickCheckBox} >
                        <input name="zloteprzeboje_" type="checkbox" id="6" />
                        Złote Przeboje
                        </label>
                    </p>

                    <p> <label id="7a" onClick={this.clickCheckBox} >
                        <input name="trojka_" type="checkbox" id="7" />
                        Trójka
                        </label>
                    </p>

{/*                     <p> <label id="7a" onClick={this.clickCheckBox} >
                        <input name="chillizet_" type="checkbox" id="7" />
                        ChilliZet
                        </label>
                    </p> */}

{/*                     <p> <label id="7a" onClick={this.clickCheckBox} >
                        <input name="rmfclassic_" type="checkbox" id="7" />
                        Rmf Classic
                        </label>
                    </p> */}
 {/*
                    <p> <label id="10a" onClick={this.clickCheckBox} >
                        <input name="antyradio_" type="checkbox" id="10" />
                        AntyRadio
                        </label>
                    </p> */}

                    <button class="musicButtton" onClick={this.showSongs}>POKA<span style={{ fontSize: 14 }}>&#380;</span> UTWORY</button>
                   
<br/>
                       
                </div>

            </div>

            <div id="movie" class="switch"> <i class="icon-video-alt" />Film 
 <div id="movieField">
<div class="headHeader">Zwiastuny produkcji filmowych:</div>
<div   id="infoLink">&#9432;info
                <div id="info">
                            Zwiastuny filmowe reprezentowane są przez ikony - wielkość ikon uzale&#380;nione są od
                            oceny filmu w serwisie <a href="http://www.filmweb.pl">filmweb.pl</a>.
                            Początkowe ulokowanie ikon jest losowe - ich poło&#380;enie mo&#380;esz dowolnie
                            zmieniać. Aby odtworzyć dany zwiastun kliknij dwukrotnie na jego ikonę.
                        </div>
                </div>
                {infoArrow}

<p/>
<label id="1m" style={{margin: 'auto'}} class="mainChoice" onClick={this.clickTV} > 
<input name="tv" type="checkbox" id="tvBox" />
Telewizja
</label>
<br/>
        <div style={{marginLeft: "18px", fontSize: '12px'}}>
        Filmy które zostaną wyemitowane 
        <br/>w najbli&#380;szych 24h <br/>w stacjach telewizji naziemnej.
        </div>
        <p/>
<label id="2m" style={{margin: 'auto', pointerEvents: "none" }} class="mainChoice"  onClick={this.clickCinema}>
<input name="tv" type="checkbox" id="cBox" /> 
 Kino
</label>
<div style={{marginLeft: "18px", fontSize: '12px'}}>
        {/* Filmy wyświetlane dzisiaj w kinach: */}
       <div class="construction"></div> Strona w budowie 
        <br/>

<table id="cityTab" style={{display: 'none'}}>
<tbody>
<tr>
<td>        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Warszawa
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Gdańsk
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Łódź
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Rzeszów
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Białystok
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Kielce
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Olsztyn
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Poznań
        </label>

        </td>
        <td>    <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Kraków
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Wrocław
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Katowice
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Szczecin
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Bydgoszcz
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Toruń
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Lublin
        </label>
        <br/>
        <label id="1c" class="cityCinema"  onClick={this.cityCinema}>
                <input name="tv" type="checkbox" id="1cc" /> 
        Opole
        </label>
        
        </td>
</tr>
</tbody>
</table>

        </div>
<p/>
<button id="bM" class= "filmButttonEnabled" onClick={this.showMovies}>POKA<span style={{ fontSize: 14 }}>&#380;</span> FILMY</button>
<br/>
</div>
            </div>
            <div id="series" class="switch"> <i class="icon-video" />Seriale 
            <div id="seriesField"><div class="construction"></div> Strona w budowie</div>
            </div>
            
            <div id="book" class="switch"> <i class="icon-book" />Literatura 
            
            <div id="bookField">
<div class="headHeader">Okładki pozycji książkowych:</div>
{/* <div id="infoLink">&#9432;info
                <div id="info">
                      Bestsellery z najlepszych księgarni
                        </div>
                </div> */}
<p/>
<label id="1b" style={{margin: 'auto'}} class="mainChoice" onClick={this.clickBestsellers} > 
<input name="book" type="checkbox" id="bookBox" />                     
Bestsellery
</label>
<br/>
<div  id="infoLink">&#9432;info
                <div id="info">
        Aktualne bestsellery z najpopularniejszych księgarni internetowych.<br/>
        Wielkości ikon reprezentujących okładki, uzalenione są od ilości księgarni 
        <br/> w których dana pozycja występuje na liście bestsellerów.
                        </div>
                </div> 
                {infoArrowBest}
        <br/>
<button id="bB" class= "bookButttonEnabled" onClick={this.showBooks}>POKA<span style={{ fontSize: 14 }}>&#380;</span> KSIĄ<span style={{ fontSize: 14 }}>&#380;</span>KI</button>
<br/>
</div>
            
            
            
            </div>
            
            <div id="events" class="switch">  <i class="icon-calendar-empty" />Wydarzenia
            <div id="eventsField"> <div class="construction"></div> Strona w budowie  </div>
             </div>
            {screenSwitch}
           {userHeader}
        </div>
        )

return (
          <div className="container">
              
            <div id="allLive" className="header">
                <div className="main" onClick={this.Main} >Live<span style={{ color: "rgba(255, 255, 255, 0.5)" }}>S</span>earch</div>

                {mainMenu}
                {infoForSmall}
                {cookieInfo}
           
               
                <Switch>
                    {/* <Route path={'/'} exact component={First} /> */}

                    
                            {first}
                            {books}
                            {songs}
                            {movies}
                            {policy}
                            {contact}
                            {information}
                            {userDesktop}
                            {userFolder}
                            {moviesAdmin}
                            {songsAdmin}
                            
                           
                            
                       {/*  <Route path={'/songs'} component={(props) => (
                            <YTArea {...props} fetchData={this.state.takeDataFrom} />
                        )} /> */}
                    

                {/* <Route path={'/youtubeid/:YT?'} exact component={(props) => (
                        <Field {...props} play={this.props.match.params.id} />
                    )} /> */}
                </Switch>

            </div>
            <div  className = {this.props.match.params.id? "footer" : "mainFooter"}>
            <div onClick={this.openLink} id={PATHES.contact} class="switchFooter">Kontakt</div>
            <div onClick={this.openLink} id={PATHES.policy} class="switchFooter">Polityka prywatności</div>
            <div onClick={this.openLink} id={PATHES.information} class="switchFooter">Dodatkowe informacje</div>
            </div>
           
            </div>
        )

    }

}

//// IF I WANT PASS DATA TO ROUTE WITH ID IN PATH:
{/* <Route path={'/songs:fd?'} render={(props) => (
  <Songs {...props} fetchData={this.state.takeDataFrom} /> */}


  const mapStateToProps = state => {
   
    return {
        isAuthenticated: state.auth.jwttoken !== null,
        jwtToken: state.auth.jwttoken,
        userName: state.auth.userName,
        isAdmin: state.auth.userRole == "ADMIN",
        //userId: state.auth.userId,
        imageUrl: state.auth.imageUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SocialLog: (userId, userName, imageUrl, token, userRole) => 
        dispatch(authLogin(userId, userName, imageUrl, token, userRole)),
        //FacebookLog: ( userName, imageUrl, token) => dispatch(authLogin(userName, imageUrl, token)),
        escManage: () => dispatch(escManage()),
        Logout: () => dispatch(authLogout()),
        serverAlert: (message) => dispatch(showServerPopup(message)),
        screenManage: () => dispatch(manageScreen()),
    };
};

  export default connect(mapStateToProps, mapDispatchToProps)(Header);