import React from "react";
import $ from "jquery";

import helpers from "../helpers/helpers.jsx";
import api from "../helpers/api.jsx";

class CheckPresence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkedInLink: "https://www.linkedin.com/in/lexyk/",
      bad_formatting: false,
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

    if (!linkedInName) {
      this.setState({
        bad_formatting: true,
      });
      return;
    }

    api.getUserByLinkedIn(linkedInName, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        this.props.setPersonData(data);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="instructions">
          <h2>Welcome to The Endorsement Train!</h2>
          <p>
            This site will make it easy for you to build your Linkedin presence,
            making it easy to connect and endorse your Hack Reactor Peers.
          </p>
          <p>
          The more people you endorse, the more people will endorse you! <br />
          The more people endorse you, the more recruiters will hit you up!
          </p>
          <p>
            <strong>To prepare to be hit on by recruiters:</strong>
            <ol>
              <li>On Your Linkedin Profile, Enable Endorsements</li>
              <li>
                Add JavaScript, Node, React, AWS and all the other skills you've
                learned at HackReactor.
              </li>
              <li>
                On this site, enter your LinkedIn and start 'friending' as many
                of your peers as you can! You'll then be able to check back
                after they have accepted your friend request to endorse them.{" "}
              </li>
            </ol>
          </p>
          <p>
          This site will automatically keep track of all the people you've friended and endorsed.
          </p>
          <p>
          Ready to hop on the Endorsement Train?
          </p>
        </div>

        <h2>Check in</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Copy your LinkedIn URL here:
            <input
              type="text"
              value={this.state.linkedInLink}
              onChange={this.handleChange}
              placeholder="https://www.linkedin.com/in/yourname"
            />
          </label>
          {this.state.bad_formatting && (
            <span className="warning">
              Not a valid Linkedin link, try copying the link directly from the
              browser
            </span>
          )}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CheckPresence;
