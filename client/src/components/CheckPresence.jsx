import React from 'react';
import $ from 'jquery';


import helpers from '../helpers/helpers.jsx'
import api from '../helpers/api.jsx'

class CheckPresence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkedInLink: 'https://www.linkedin.com/in/lexyk/',
      bad_formatting: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange(event) {

    this.setState({
      linkedInLink: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let linkedInName = helpers.cleanLinkedIn(this.state.linkedInLink);

    if(!linkedInName) {
      this.setState({
        bad_formatting: true
      })
      return;
    }

    api.getUserByLinkedIn(linkedInName, (err, data) => {
      if (err) {
        console.log(err);
      } else {

        this.props.setPersonData(data);

      }
    })

  }

  render() {

    return (
      <div>
        <h2>Check in</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Please Paste Linkedin Link:
            <input type="text" value={this.state.linkedInLink} onChange={this.handleChange} placeholder="https://www.linkedin.com/in/yourname"/>
          </label>
          {this.state.bad_formatting &&
            <span className="warning">Not a valid Linkedin link, try copying the link directly from the browser</span>
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CheckPresence;
