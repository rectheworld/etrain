import React from 'react';
import PropTypes from "prop-types";

import ConnectionItem from './ConnectionItem.jsx'

import api from '../helpers/api.jsx'


class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionItems: {},
      preformaceMetrics: {}
    }

    this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
    this.updateConnectionStatusCallBack = this.updateConnectionStatusCallBack.bind(this);
    this.getNonConnectionbyCohort = this.getNonConnectionbyCohort.bind(this);

  }


  /**
  processConnections
  Takes the data returned from API and formats into an object where the key is the target_id and the value is the
  returned data for that person with the a status field added.

  @param {list of objects} data Data returned from the /connections route
  Example input for 'data':
      [ { "id": 7, "first_name": "Ren", "last_name": "C'deBaca", "linkedin": "ren-c-debaca-663b7920", "cohort_id": 2, "num_connections": 45 }]

  @return {list of objects}
  Example
  */
  processConnections (data) {

    let connectionItems = {};
    data.forEach((x) => {
      x['status'] = 'none'
      connectionItems[x.id] = x;
    });

    this.setState({
      connectionItems: connectionItems
    })

  }

   /**
  updateConnectionStatus
  Send an API POST request to update the connection status on the server side
  Addionally, upon a successful update reredner the current conencton list so the tarrget user is grayed out

  @param target_id {int} The db id of the target connection
  @param status {string} The string represting the new status. Either 'friended' or 'endorsed'

  @example
  */
  updateConnectionStatus (target_id, status) {
    console.log(`In updateConnectionStatus with ${target_id} and ${status}`);



    api.updateConnection( this.props.person_id, target_id, status, this.updateConnectionStatusCallBack);
  } // End updateConnectionStatus

  updateConnectionStatusCallBack (err, data, target_id) {
    console.log('updateConnectionStatusCallBack');

    if (err) {
      console.log(err)
    } else {
      // Upon Success, update the front end status of the link so it appears grayed out
      let newConnections = this.state.connectionItems;
      newConnections[target_id].status = 'clicked';
      this.setState({
        connectionItems: newConnections
      })
    }
  } // End updateConnectionStatusCallBack


  /// on Mount, return the people in the users cohort who are not endorsed
  componentDidMount () {

    api.getPreformaceMetrics(this.props.person_id, this.props.cohort_id, this.props.junior_id, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Process connection data into a format for the state variable
        this.setState({
          preformaceMetrics: data
        })
      }
    });

    api.getNonConnections(this.props.person_id, this.props.cohort_id,(err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Process connection data into a format for the state variable
        this.processConnections(data);
      }
    })

  } // End componentDidMount

  getNonConnectionbyCohort (personid, cohortRelation) {

    let relationMap = {
      "self": this.props.cohort_id,
      "junior": this.props.junior_id,
      "senior": this.props.senior_id
    }

    let cohortRelationId = relationMap[cohortRelation];


    api.getNonConnections(personid, cohortRelationId,(err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Process connection data into a format for the state variable
        this.processConnections(data)
      }
    })

  } // End getNonConnectionbyCohort

  getEndorsedPersons (personid) {


    api.getEndorsedPersons(personid,(err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Process connection data into a format for the state variable
        this.processConnections(data)
      }
    })

  } // End getNonConnectionbyCohort

  render() {

    // let connectionLinks = this.state.connectionItems.map((person) =>
    let connectionLinks = [];
    Object.entries(this.state.connectionItems).forEach((key) =>
     {
       // Grba the person object
      let person = key[1];
      // Create a Connection link Reacto Component
      connectionLinks.push(
        <ConnectionItem
        key = {person.linkedin}
        first_name = {person.first_name}
        last_name = {person.last_name}
        linkedin = {person.linkedin}
        target_id = {person.id}
        status={person.status}
        updateConnectionStatus = {this.updateConnectionStatus}/>
        )
      })


    return (
      <div>
        <h3>Welcome {this.props.first_name}! </h3>

        <p>
          You have endorsed __ of people from your cohort!
          You have also endorsed _ of your juniors and ___ of your peers!
        </p>

        <h3> Lets keep the Karma Rolling!</h3>
        {connectionLinks}
      </div>
    );
  }
}


Welcome.propTypes = {
  person_id: PropTypes.number.isRequired,
  cohort_id: PropTypes.number.isRequired,
  senior_id: PropTypes.number.isRequired,
  junior_id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired
}

export default Welcome;
