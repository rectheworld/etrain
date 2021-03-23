const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const Person = require('../database/controllers/people.js');
const Cohort = require('../database/controllers/cohort.js');
const Connection = require('../database/controllers/connection.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));


/// Get a cohort
app.get('/cohort', (req, res) => {
  Cohort.getCohortId(req.query, (err, data) => {

    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }

  });
});

/// Create a cohort and peer cohorts
app.post('/cohort', (req, res) => {
  console.log(req.query.name, req.query.junior_name)

  Cohort.createCohort(req.query.name, req.query.junior_name, req.query.start_date, (err, data) => {

    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }

  });
});

/// Users

/// Create a User
app.post('/person/create', (req, res) => {
  let userData = req.body;

  Cohort.getCohortId({name: userData.cohort_name}, (err, data) => {

    /// Test if a cohort was returned

    // If not, return a new cohort alert
    if (Object.keys(data).length <= 0 ) {
      res.send( {
        'alert' : "New Cohort"
      });

    } else {
    /// if ti was returned, prepare create person and the response
    userData['cohort_id'] = data.cohort_id;
    userData['junior_id'] = data.junior_id;
    userData['senior_id'] = data.senior_id;

    Person.createPerson(userData, (err, data) => {
      if (err) {
        res.send (`An Error Occured ${err}`)
      } else {
        res.send({
          "insert_response": data,
          "user_data": userData
        })
      }
    });

    } // End of If stament on if cohort exisits
  })

});

/// Get a User's data by submitinga a name
app.get('/person', (req, res) => {

  Person.getPerson(req.body, (err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });

});

/// Get a User's data by submitinga a linkedin name
app.post('/person/linkedIn', (req, res) => {

  Person.getPersonByLinkedIn(req.body, (err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });

});


/// Get a List of all the people Who this person have not endorced
app.get('/connections', (req, res) => {

  Connection.getUnConnectedList(req.query.id, req.query.cohort_id, (err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });

});

// Post a new connection between a user and a target person
app.post('/connections', (req, res) => {

  Connection.createConnection(req.query.id, req.query.target_id, req.query.status_type,(err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });
});

// Gets connections that have been endorsed by the target person
app.get('/connections/endorsed', (req, res) => {

  Connection.getEndorsedConnections(req.query.id, (err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });
});


// Get the id of a exisiting connection if it exisits
app.get('/connections/id', (req, res) => {

  Connection.getConnectedId(req.query.id, req.query.target_id,(err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });
});


// Get the preformance metrics of a user
app.get('/connections/metrics', (req, res) => {

  Connection.getConnectionMetrics(req.query.id, req.query.cohort_id, req.query.junior_id,(err, data) => {
    if (err) {
      res.send (`An Error Occured ${err}`)
    } else {
      res.send(data)
    }
  });
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
