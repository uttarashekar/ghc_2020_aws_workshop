import React from 'react'
import Footer from './Footer'

export default (props) => {
    console.log("props"+JSON.stringify(props.location.state))
    const state = props.location.state
    return(
        <div id="wrapper" className="divided">
        <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
            <div className="content">
                <h1>{state.title}</h1>
                <p className="major">{state.content}</p>
            </div>
            <div className="image">
                <img src="../images/banner.jpg" alt="" />
            </div>
        </section>
        <Footer />
        </div>
    )
}