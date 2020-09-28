import React, { Component} from 'react'
import Amplify, { API } from 'aws-amplify'
import config from '../aws-exports'
import "@babel/polyfill"

Amplify.configure(config)

class CreateStoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          content: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        const inputValue = event.target.value;
        const stateField = event.target.name;
        this.setState({
          [stateField]: inputValue,
        });
        console.log(this.state);
      }

      async handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        let newStory = {
            body: {
                title: title, content: content
            }
        }
        await API.post('createStory', '/story', newStory ).then(response => {
        console.log(response)
        }).catch(error => {
            console.log("Got error")
            console.log(error.response)
        });
        event.preventDefault();
        this.setState({
            title: " ",
            content: " "
        });
    }
    render() {
        return (
            <section className="wrapper style1 align-center">
            <div className="inner medium">
                <h2>Want to post your own story? Fill this form out and send it over!</h2>
                <form method="post"  onSubmit={this.handleSubmit}>
                    <div className="fields">
                        <div className="field">
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label for="content">Content</label>
                            <textarea name="content" id="content" rows="6" value={this.state.content} onChange={this.handleChange} ></textarea>
                        </div>
                    </div>
                    <ul className="actions special">
                        <li><input type="submit" name="submit" id="submit" value="Send Message" /></li>
                    </ul>
                </form>

            </div>
        </section>
        )
    }
}

export default CreateStoryForm