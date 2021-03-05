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
    cb(null, response.data);
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
    url: `http://localhost:3000/connections/?id=${id}&target_id=${target_id}&status_type=${status_type}`,
    headers: { }
  };

  axios(config)
  .then(function (response) {
    cb(null, response.data, target_id)
  })
  .catch(function (error) {
    cb(error);
  });

} // End getNonConnections

module.exports = {
  getUserByLinkedIn: getUserByLinkedIn,
  getNonConnections: getNonConnections,
  updateConnection: updateConnection
}