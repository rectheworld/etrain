import React from 'react';
import PropTypes from "prop-types";
import Stats from './Stats.jsx'


import api from '../helpers/api.jsx'
import ConnectionLinks from './ConnectionLinks.jsx';


class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionItems: {},
      preformaceMetrics: {num_cohort_self: 0}
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
    console.log(data)
    data.forEach((x) => {
      if(!x['status']) {
        x['status'] = 'none'
      connectionItems[x.id] = x;
      }
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

    api.updateConnection( this.props.person_id, target_id, status, () => this.updateConnectionStatusCallBack(status));
  } // End updateConnectionStatus

  // updateConnectionStatusCallBack (err, data, target_id) {
  updateConnectionStatusCallBack (status) {
    console.log('updateConnectionStatusCallBack');

    if (err) {
      console.log(err)
    } else {
      // Upon Success, update the front end status of the link so it appears grayed out
      let newConnections = this.state.connectionItems;
      newConnections[target_id].status = status;
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
          preformaceMetrics: data[0]
        }, ()=> console.log(this.state.preformaceMetrics))
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
    console.log(cohortRelationId)


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
    console.log(this.state.connectionItems)
    // let connectionLinks = this.state.connectionItems.map((person) =>
    return (
      <div>
        <section>
        <h2>Welcome {this.props.first_name}! </h2>
          <Stats preformaceMetrics={this.state.preformaceMetrics}/>
        </section>
        <section>
          <h4>your cohort</h4>
          <h4>your juniors</h4>
        </section>
        <ConnectionLinks
        connectionItems={this.state.connectionItems}
        updateConnectionStatus={this.updateConnectionStatus}
        />
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
