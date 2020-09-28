import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

export default (props) => {

    return(
        <div id="wrapper" className="divided">
        <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
            <div className="content">
                <h2>Page Not Found. The link that you are looking for does not exist.</h2>
            </div>
        </section>

        <Footer />

        </div>
    )
}