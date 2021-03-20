import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import AddUser from './AddUser.jsx';
import CheckPresence from './CheckPresence.jsx';
import Welcome from './Welcome.jsx';

import Styles from "./Styles/App.module.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'CheckPresence',
      first_name: '',
      last_name: '',
      linkedin: '',
      cohort_id: '',
      junior_id: '',
      senior_id: '',
      person_id: '',
      inSystem: 'unknown',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPersonData = this.setPersonData.bind(this);
  }


  handleChange(event) {


    this.setState({
      first_name: event.target.first_name,
      last_name: event.target.last_name,
      linkedin: event.target.linkedin,
      cohort_id: event.target.cohort_id,

    });
  }

  handleSubmit(event) {
    event.preventDefault();


  }

  setPersonData (data) {

    if (data.hasOwnProperty('empty')) {
      this.setState({
        inSystem: 'notfound',
        currentPage: 'AddUser',
      })
    } else {

      this.setState({
        first_name: data.first_name,
        last_name: data.last_name,
        linkedin: data.linkedin,
        cohort_id: data.cohort_id,
        junior_id: data.junior_id,
        senior_id: data.senior_id,
        person_id: data.id,
        inSystem: 'logedin',
        currentPage: 'Welcome',
      })

    }

  }

  render() {

    let pageMap = {
      // 'welcome': <WelcomePage swtichPagaes={this.swtichPagaes} setSessionInfo={this.setSessionInfo} initSocket={this.initSocket} />,
      'AddUser' : <AddUser first_name={this.state.first_name} setPersonData = {this.setPersonData}/>,
      'Welcome' : <Welcome
      person_id = {this.state.person_id}
      first_name = {this.state.first_name}
      cohort_id = {this.state.cohort_id}
      junior_id = {this.state.junior_id}
      senior_id = {this.state.senior_id}
      />,
      'CheckPresence' : <CheckPresence setPersonData = {this.setPersonData}/>

    }

    let currentPage = pageMap[this.state.currentPage]

    return (
      <div className={Styles['wrapper']}>
        <div className="logo">
          <h1>The Endorsement Train</h1>
        </div>
        <main>{currentPage}</main>
      </div>
    );
  }
}

export default App;
