import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default (props) => {
    const orient = props.orient || "orient-right"
    const containerClass = "spotlight style1 "+orient+" content-align-left image-position-center onscroll-image-fade-in"
    let truncatedContent = props.content.toString()
    if (truncatedContent.length > 100) {
        truncatedContent = (props.content + "").substring(0, 450) + "..."
    }
    
    return(
        <section className={containerClass} id="first">
            <div className="content">
                <h2>{props.title}</h2>
                <p>{truncatedContent}</p>
                <ul className="actions stacked">
                    <Link to={{pathname:`/story/${props.id}`, state:{id: props.id, title: props.title, content: props.content}}} className="button">Learn More</Link>
                </ul>
            </div>
            <div className="image">
                <img src="images/spotlight01.jpg" alt="" />
            </div>
        </section>
    )
}