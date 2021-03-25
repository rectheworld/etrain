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
      preformaceMetrics: {},
      displayedCohort: 'self'
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

    // let connectionItems = {};
    // console.log(data)
    // data.forEach((x) => {
    //   if(!x['status']) {
    //     x['status'] = 'none'
    //   connectionItems[x.id] = x;
    //   }
    // });

    this.setState({
      connectionItems: data
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

  updateConnectionStatusCallBack (err, data, target_id, status) {
    console.log('updateConnectionStatusCallBack');

    if (err) {
      console.log(err)
    } else {
      // // Upon Success, update the front end status of the link so it appears grayed out
      // let newConnections = this.state.connectionItems;
      // newConnections[target_id].status = status;
      // this.setState({
      //   connectionItems: newConnections
      // })

      this.getNonConnectionbyCohort(this.props.person_id, this.state.displayedCohort)
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
    console.log(cohortRelationId)


    api.getNonConnections(personid, cohortRelationId,(err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Process connection data into a format for the state variable
        this.processConnections(data)
      }
    }, 
    this.setState({ displayedCohort: cohortRelation})
      )

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
    return (
      <div>
        <section>
        <h2>Welcome {this.props.first_name}! </h2>
          <Stats preformaceMetrics={this.state.preformaceMetrics}/>
        </section>
          <section id="instuctions">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, justo bibendum mauris quam arcu, quam laoreet.Nisl turpis in turpis lobortis donec urna. Orci proin purus pellentesque felis. Nibh orci diam fermentum morbi pharetra purus.
          </section>
        <div className="endorsed" onClick={()=>this.getEndorsedPersons(this.props.person_id)}>
        <svg width="20" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7556 15.2475L4.17813 8.66979L0 12.8481L11.1515 24L28 3.78823L23.4555 0L10.7556 15.2475Z" fill="white"/>
</svg>
  
        </div>
        <section>
        <h3> Lets keep the Karma Rolling!</h3>
        <div className="tabs">
          <div className={this.state.displayedCohort !== 'self'? 'tab': 'tabFocus'}
          onClick={()=>this.getNonConnectionbyCohort(this.props.person_id, 'self')}>
            your cohort
          </div>
          <div className={this.state.displayedCohort !== 'junior'? 'tab' : 'tabFocus'}
          onClick={()=>this.getNonConnectionbyCohort(this.props.person_id, 'junior')}>
            juniors
          </div>
          <div className={this.state.displayedCohort !== 'senior'? 'tab' : 'tabFocus'}>
            seniors
          </div>
        </div>
        <ConnectionLinks
        connectionItems={this.state.connectionItems}
        updateConnectionStatus={this.updateConnectionStatus}
        />
        </section>
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
