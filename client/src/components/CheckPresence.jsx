import React from 'react';
import $ from 'jquery';


import helpers from '../helpers/helpers.jsx'
import api from '../helpers/api.jsx'

class CheckPresence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkedInLink: '',
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
      // <div>
      //   <div>
      //     <h3>Welcome to the Endorsement Train</h3>
      //     Lets me check your ticket:
      //   </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Please Paste Linkedin Link:
            <input type="text" value={this.state.linkedInLink} onChange={this.handleChange} />
          </label>
          {this.state.bad_formatting &&
            <h2> That linkedIn link did not work, try pasting the link from a browser</h2>
          }
          <input type="submit" value="Submit" />
        </form>
      // </div>
    );
  }
}

export default CheckPresence;
