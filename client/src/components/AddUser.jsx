import React from 'react';
import $ from 'jquery';
import axios from 'axios';



class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      linkedin: '',
      cohort: '',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange(event) {
    // debugger;

    this.setState({
      firstName: event.target.firstName,
      lastName: event.target.lastName,
      linkedin: event.target.linkedin,
      cohort: event.target.cohort
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Hmmmm looks like your not a pasager on the train yet?</h3>
          Lets get you a ticket!
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" value={this.state.lastName} onChange={this.handleChange} />
          </label>
          <label>
            Linkedin:
            <input type="text" value={this.state.linkedin} onChange={this.handleChange} />
          </label>
          <label>
            Cohort:
            <input type="text" value={this.state.cohort} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddUser;
