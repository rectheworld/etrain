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
      cohort: '',
      newCohort: false,
      juniorCohort: '',
      startDateCohort: '',
      notAsshole: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.CreateNewUser = this.CreateNewUser.bind(this);

  }

  CreateNewUser () {
    console.log('CreateNewUser');

    let linkedInName = helpers.cleanLinkedIn(this.state.linkedin);

    api.createUser(linkedInName, this.state.firstName, this.state.lastName, this.state.cohort.toUpperCase(), (err, data) => {
      if (err) {
        console.log(err);
      } else {

        // if there is an alert, activate the new cohort fields,
        // The new user has not been created.
        if (data.hasOwnProperty('alert'))
          this.setState({
            newCohort: true
          });

        else {
          api.getUserByLinkedIn(linkedInName, (err, data) => {
            if (err) {
              console.log(err);
            } else {

              this.props.setPersonData(data);

            }
          }) /// End getUserByLinkedIn
      }

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

    /// Check if we are adding a new cohort

    if (this.state.newCohort & !this.state.notAsshole) {
      api.createCohort(this.state.cohort.toUpperCase(), this.state.juniorCohort.toUpperCase(), this.state.startDateCohort, (err, data) => {
        if (err) {
          console.log(err);
        } else {

            this.CreateNewUser()

        }
      })

    } else {

      this.CreateNewUser()

    }


  }




  render() {
    return (
      <div>
        <div className="bottom-buffer">
          <h2>Hmmmm looks like you're not a passanger on the train yet...</h2>
          <strong>Lets get you a ticket!</strong>
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

          {this.state.newCohort &&
          <div>
            <div>
              Hmmm I dont reconize that cohort name. Did you enter it correctly?
            </div>
            <br></br>
            <div>
              If you are part of a cohort that is not yet in the system would you please give some additional details to help you and your peers out!
            </div>
            <br></br>
            <label>
            Junior Cohort Name:
            <input type="text" name="juniorCohort" value={this.state.juniorCohort} onChange={this.handleChange} />
          </label>
          <label>
          Start Date:
          <input type="text" name="startDateCohort" value={this.state.startDateCohort} onChange={this.handleChange} placeholder = 'yyyy-mm-dd'/>
        </label>
        <div>
           Please dont use this feature to troll or provide bad infomation about your cohort's details.
        </div>
        <br></br>
        <div>
           The vision of this site is the make it as easy as possible for HackReactor students to grow their network and having accurate infomation is the first step.
        </div>
        <br></br>
        <label>
          I certify that I am Not An Asshole
          <input
            name="isAsshole" type="checkbox" value={this.state.notAsshole} onChange={this.handleInputChange} />

        </label>
        </div>
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddUser;
