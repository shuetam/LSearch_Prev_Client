
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';





class First extends Component {

    state = {
        topFirst: '115px',
        topGlass: '565px'
    }

    animated = () => {
        setTimeout(() => {
            console.log('Our data is fetched');
            this.setState({
                topFirst: '315px', topGlass: '365px'
            })
        }, 1000)
    }


    componentDidMount() {

        this.animated();

    }


    render() {
   

        return (
            <div>

{/* <iframe src="https://open.spotify.com/embed/track/69kL0yREcZOBJbBz9UxN3L" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
 */}

                <div style={{ top: this.state.topFirst }} className="First">Live<span style={{ color: "rgba(255, 255, 255, 0.5)" }}>S</span>earch</div>

<div className="glassMain" style={{ top: "40px" }}>
   <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fevents%2F399159534066838%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=2395943984012670" width="500" height="500" style={{border:'none', zIndex: "400", overflow: 'auto'}} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </div>          

                <div className="glassMain" style={{ top: this.state.topGlass }}>
                    <div>Live<span style={{ color: "rgba(255, 255, 255, 0.5)" }}>S</span>earch</div>
                </div>
                <div className="blurMain">
                </div>

            </div>
        )


    }
}

export default First;