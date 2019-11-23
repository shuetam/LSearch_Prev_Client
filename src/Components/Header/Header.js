
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
//import "../../Fontello/css/fontello.css";
//import "../../icon/css/fontello.css";
import "../../Icons/css/fontello.css";
//import "../../Icons1/css/fontello.css";
import { Link, Route, NavLink, BrowserRouter, Switch } from 'react-router-dom';
import YTArea from '../Areas/YTArea';
import Field from '../Fields/Field';
import Popup from '../Popup/Popup';
import ServerPopup from '../Popup/ServerPopup';
import First from '../../First';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import {authLogin, authLogout, showServerPopup} from '../../Store/Actions/auth';
import FacebookLogin from 'react-facebook-login';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
//import {scrollU, scrollD} from '../../Store/Actions/scroll';
import UserDesktop from '../Areas/UserDesktop';
import axios from 'axios';
import {URL} from '../../environment'



var fetchData = "";
var opacity = 0.4;
var  movieChecked = true;

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

            takeSongDataFrom: "",
            takeMovieDataFrom: "",
            opacity: 0.4,
           

        }
    }

    componentDidMount() {
        console.log("PARAMS");
        console.log(this.props);
        //debugger;
        if(!this.props.isAuthenticated) {

            var facebooks = document.getElementsByClassName("loginBtn loginBtn--facebook");
            for(var i=0;i<facebooks.length;i++) {
                document.getElementsByClassName("loginBtn loginBtn--facebook")[i].innerHTML = "Zaloguj przez Facebook";
            }
        }
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
        this.props.history.push('/profil/pulpit');
    }


    socialLogin = (name, email, image, token) => {
    const data = {
        Email: email,
        Token: token
    };
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }};
    
    axios.post(URL.api+URL.login, data)
    .then(response => {
        console.log(response);

        if(response.data == "error") {
            this.Alert("Wystąpił błąd przy próbie zalogowania.");
        }
        else {
            this.props.SocialLog(response.data.userId, name, image);
        }
    }).catch(error => {console.log(error); this.Alert("Wystąpił błąd.")});
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


        for (var i = 1; i < 7; i++) {
            document.getElementById(i).disabled = false;
            //////here
            if (document.getElementById(i).checked) {
                document.getElementById(i+'a').style.color='rgba(231, 173, 64, 0.637)';
                stateCount = stateCount + 1;
                if (stateCount === 3) {

                    for (var i = 1; i < 7; i++) {
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

        for (var i = 1; i < 7; i++) {
            if (document.getElementById(i).checked) {
                fetchFrom = fetchFrom + document.getElementById(i).name;
            }


        }
        console.log('I FETCHED FROM: ' + fetchFrom);

        fetchData = URL.api + URL.radioSongs + fetchFrom;


        if (fetchFrom === "") {
            fetchData = URL.api + URL.randomSongs;
        }

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
        console.log("Fetch data when clicked:  " + fetchData);
        this.setState({ takeSongDataFrom: fetchData })
        this.props.history.push('/songs');
    };

    showMovies = () => {
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
        this.props.history.push('/movies');
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

    let movies = 
       <Route path={'/movies'} component={(props)=> (
             <YTArea {...props} fetchData = {this.state.takeMovieDataFrom} />
         )} />;

    let songs =  <Route path={'/songs'} component={(props) => (
            <YTArea {...props} fetchData={this.state.takeSongDataFrom} />
        )} />;



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



        if(this.props.isAuthenticated) {
            userDesktop = (<Route path={'/profil/pulpit'} component={(props) => (
                <UserDesktop {...props} />
            )} />);

            userFolder = (<Route path={'/profil/folder/:fid?'} component={(props) => (
                <UserDesktop {...props} />
            )} />);
        } 
        else {
           loginPanel = <div class="loginPanel"> {loginButtons}</div>
        }





let authenticate = (<div class="logIn" id="userP"> Zaloguj się
<div id="login" class="social"> 
{loginButtons}
</div>
</div>);
//let url = 'https://lh5.googleusercontent.com/-fM22zCVGNzY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2KVOJS8-bzXw0bRyHnScQ_eqykA/s96-c/photo.jpg';
let userPanel = (<div class="logIn" id="userP"> <img  id="imageGoogle" src={this.props.imageUrl}></img> <span style={{position: 'relative', top: -3}}>{this.props.userName}</span>
<div id="login"> <div class="desktop" onClick={this.myDesktop}>Mój pulpit</div> <div class="desktop" style={{fontSize: 12}}  onClick={this.logOut}>Wyloguj</div> </div>
</div>);

let userHeader = this.props.isAuthenticated ? userPanel :  authenticate;

    

        let mainMenu = (<div class="menu"  onMouseEnter={this.facebookTitle}>
            <div id="music" class="switch">
                <i class="icon-note" />
                Muzyka
                <div id="radio">

                    <div class="headHeader">Utwory grane w ostatnich 24h w:</div>
                    <text id="infoLink">&#9432;info
                <div id="info">
                                Utwory prezentowane są przez ikony - wielkość ikon uzaleniona jest od
                                łącznej ilości odtworzeń utworu w wybranych stacjach radiowych.
                                Początkowe ulokowanie ikon jest losowe - ich poło&#380;enie mo&#380;esz dowolnie
                                zmieniać. Aby odtworzyć dany utwór kliknij dwukrotnie na jego ikonę.
                                <p>W jednym czasie mo&#380;esz wizualizować dane z maksymalnie 3 stacji radiowych.</p>
                                <p>W przypadku braku zaznaczenia jakichkolwiek stacji, system wylosuje i zaprezentuje 60 utworów (po 10 z ka&#380;dego radia) </p>
                            </div>
                        </text>
                                  
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

            <div id="movie" class="switch"> Film 
 <div id="movieField">
<div class="headHeader">Zwiastuny produkcji filmowych:</div>
<text id="infoLink">&#9432;info
                <div id="info">
                            Zwiastuny filmowe reprezentowane są przez ikony - wielkość ikon uzaleniona jest od
                            oceny filmu w serwisie <a href="http://www.filmweb.pl">filmweb.pl</a>.
                            Początkowe ulokowanie ikon jest losowe - ich poło&#380;enie mo&#380;esz dowolnie
                            zmieniać. Aby odtworzyć dany zwiastun kliknij dwukrotnie na jego ikonę.
                        </div>
                </text>

<p/>
<label id="1m" style={{margin: 'auto'}} class="movieChoice" onClick={this.clickTV} > 
<input name="tv" type="checkbox" id="tvBox" />                     
Telewizja
</label>
<br/>
        <div style={{marginLeft: "18px", fontSize: '12px'}}>
        Filmy które zostaną wyemitowane 
        <br/>w najbli&#380;szych 48h <br/>w stacjach telewizji naziemnej.
        </div>
        <p/>
<label id="2m" style={{margin: 'auto', pointerEvents: "none" }} class="movieChoice"  onClick={this.clickCinema}>
<input name="tv" type="checkbox" id="cBox" /> 
 Kino
</label>
<div style={{marginLeft: "18px", fontSize: '12px'}}>
        {/* Filmy wyświetlane dzisiaj w kinach: */}
        Strona w budowie :)
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
            <div class="switch"> Wydarzenia </div>

           {userHeader}
        </div>
        )

        return (
          <div className="container">
              <ReactScrollWheelHandler upHandler={ this.scrollDown} downHandler={this.scrollUp}>
            <div id="allLive" className="header">
                <div className="main" onClick={this.Main} >Live<span style={{ color: "rgba(255, 255, 255, 0.5)" }}>S</span>earch</div>

                {mainMenu}
                {this.opacity}
               
                
                <Switch>
                    <Route path={'/'} exact component={First} />
                    )}/>
                            {songs}
                            {movies}
                            {userDesktop}
                            {userFolder}
                            {loginPanel}
                            
                       {/*  <Route path={'/songs'} component={(props) => (
                            <YTArea {...props} fetchData={this.state.takeDataFrom} />
                        )} /> */}
                    

                {/* <Route path={'/youtubeid/:YT?'} exact component={(props) => (
                        <Field {...props} play={this.props.match.params.id} />
                    )} /> */}
                </Switch>

            </div>
            <div className="footer"></div>
            </ReactScrollWheelHandler>
            </div>
        )

    }

}

//// IF I WANT PASS DATA TO ROUTE WITH ID IN PATH:
{/* <Route path={'/songs:fd?'} render={(props) => (
  <Songs {...props} fetchData={this.state.takeDataFrom} /> */}


  const mapStateToProps = state => {
   
    return {
        isAuthenticated: state.auth.userId !== null,
        userName: state.auth.userName,
        userId: state.auth.userId,
        imageUrl: state.auth.imageUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SocialLog: (userId, userName, imageUrl, token) => dispatch(authLogin(userId, userName, imageUrl)),
        //FacebookLog: ( userName, imageUrl, token) => dispatch(authLogin(userName, imageUrl, token)),
  
        Logout: () => dispatch(authLogout()),
        serverAlert: (message) => dispatch(showServerPopup(message))

    };
};

  export default connect( mapStateToProps, mapDispatchToProps )(Header);