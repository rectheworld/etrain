import axios from 'axios';


const getUserByLinkedIn = (name, cb) => {


  let data = JSON.stringify({"linkedin": name});


  // Set up request config
  var config = {
    method: 'post',
    url: '/person/linkedin',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {

    if (response.data.length > 0) {
      cb(null, response.data[0]);
    } else {
      cb(null, {empty: true});
    }

  })
  .catch(function (error) {
    cb(error);
  });

} // End getUserByLinkedIn

const getNonConnections = (id, cohort_id, cb) => {
  // Set up request config
  var config = {
    method: 'get',
    url: `/connections/?id=${id}&cohort_id=${cohort_id}`,
    headers: { },

  };

  axios(config)
  .then(function (response) {
    cb(null, response.data)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections


const updateConnection = (id, target_id, status_type, cb) => {
  // Set up request config
  var config = {
    method: 'post',
    url: `/connections/?id=${id}&target_id=${target_id}&status_type=${status_type}`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data, target_id, status_type)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections

const createUser = (linkedin, first_name, last_name, cohort_name, cb) => {
  var data = JSON.stringify({"linkedin": linkedin,"first_name": first_name,"last_name": last_name,"cohort_name": cohort_name});

  // Set up request config
  var config = {
    method: 'post',
    url: '/person/create',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections


/// Get preformace Metrics
const getPreformaceMetrics = (person_id, cohort_id, junior_id,cb) => {
  // Set up request config

  var config = {
    method: 'get',
    url: `/connections/metrics?id=${person_id}&cohort_id=${cohort_id}&junior_id=${junior_id}`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections


/// Get endorsed persons
const getEndorsedPersons = (person_id, cb) => {
  // Set up request config

  var config = {
    method: 'get',
    url: `/connections/endorsed/?id=${person_id}`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getEndorsedPersons


/// Get preformace Metrics
const createCohort = (cohort_name, junior_name, start_date, cb) => {
  // Set up request config

  var config = {
    method: 'post',
    url: `/cohort/?name=${cohort_name}&junior_name=${junior_name}&start_date='${start_date}'`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections

module.exports = {
  getUserByLinkedIn: getUserByLinkedIn,
  getNonConnections: getNonConnections,
  updateConnection: updateConnection,
  createUser: createUser,
  getPreformaceMetrics:getPreformaceMetrics,
  getEndorsedPersons:getEndorsedPersons,
  createCohort:createCohort
}