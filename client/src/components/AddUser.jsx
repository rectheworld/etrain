import React from 'react';
import api from '../helpers/api.jsx'
import helpers from '../helpers/helpers.jsx'

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      linkedin: '',
      cohort: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.CreateNewUser = this.CreateNewUser.bind(this);

  }

  CreateNewUser (linkedin, first_name, last_name, cohort_name, cb) {
    console.log('CreateNewUser');

    api.createUser(linkedin, first_name, last_name, cohort_name, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data)

      }
    })

  } // End CreateNewUser


  handleChange(event) {


    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    let linkedInName = helpers.cleanLinkedIn(this.state.linkedin);

    this.CreateNewUser(linkedInName, this.state.firstName, this.state.lastName, this.state.cohort,(err, response) => {

      if (err) {
        console.log(err);
      } else {

        api.getUserByLinkedIn(linkedInName, (err, data) => {
          if (err) {
            console.log(err);
          } else {

            this.props.setPersonData(data);

          }
        })
      }
    })

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
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </label>
          <label>
            Linkedin:
            <input type="text" name="linkedin" value={this.state.linkedin} onChange={this.handleChange} />
          </label>
          <label>
            Cohort:
            <input type="text" name="cohort" value={this.state.cohort} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddUser;
