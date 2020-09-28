import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Footer, Section, SingleStory, CreateStoryForm } from './components'
import "@babel/polyfill";

import Amplify, { API } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const [stories, setStories] = useState([])
    async function fetchStories() {
      const stories = await API.get('readStories', '/stories')
      console.log("stories: "+JSON.stringify(stories))
      let stories_with_orient = []
      let prev_orient = "orient-left"
      for (let story of stories["stories"]) {
        let orient = prev_orient === "orient-right" ? "orient-left" : "orient-right"
        story["orient"] = orient
        stories_with_orient.push(story)
        prev_orient = orient
      }
      setStories(stories_with_orient)
    }
    useEffect(() => {
      fetchStories()
    }, [])
    
    return (
    <Router>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/story/:id" component={ SingleStory }/>
        </Switch>
    </Router>
    );
}

const Home = () => {
    const [stories, setStories] = useState([])
    async function fetchStories() {
      const stories = await API.get('readStories', '/stories')
      console.log("stories: "+JSON.stringify(stories))
      let stories_with_orient = []
      let prev_orient = "orient-left"
      for (let story of stories["stories"]) {
        let orient = prev_orient === "orient-right" ? "orient-left" : "orient-right"
        story["orient"] = orient
        stories_with_orient.push(story)
        prev_orient = orient
      }
      setStories(stories_with_orient)
    }
    useEffect(() => {
      fetchStories()
    }, [])
    return (
    <div id="wrapper" className="divided">
        <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
            <div className="content">
                <h1>Seattle News Bulletin</h1>
                <p className="major">Learn more about Covid 19 stats, local news, country-wide social reforms and Seattle's upcoming local businesses here! </p>
                <ul className="actions stacked">
                    <li><a href="#first" className="button big wide smooth-scroll-middle">Get Started</a></li>
                </ul>
            </div>
            <div className="image">
                <img src="images/seattle.jpg" alt="" />
            </div>
        </section>

        {
        stories.map(story => {
              return <Section orient={story.orient} title={story.title} content={story.content} id={story.id} />
        })}

        <section className="wrapper style1 align-center">
            <div className="inner">
                <h2>Local Businesses</h2>
                <p>Find out more about new businesses opening up near you! From beautiful cloth mask vendors to freelance writers, we have details about them all!</p>
                <div className="items style1 medium onscroll-fade-in">
                    <section>
                        <span className="icon style2 major fa-gem"></span>
                        <h3>Lorem</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-save"></span>
                        <h3>Ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-chart-bar"></span>
                        <h3>Dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-wifi"></span>
                        <h3>Amet</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-cog"></span>
                        <h3>Magna</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon style2 major fa-paper-plane"></span>
                        <h3>Tempus</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-desktop"></span>
                        <h3>Aliquam</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-sync-alt"></span>
                        <h3>Elit</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-hashtag"></span>
                        <h3>Morbi</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-bolt"></span>
                        <h3>Turpis</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-envelope"></span>
                        <h3>Ultrices</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                    <section>
                        <span className="icon solid style2 major fa-leaf"></span>
                        <h3>Risus</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
                    </section>
                </div>
            </div>
        </section>

        <CreateStoryForm />

        <Footer />

        </div>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));