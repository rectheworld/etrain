
const db = require('../index.js');

const createPerson = (data, cb) => {

  let person_query = `INSERT INTO people(first_name,last_name,linkedin,corhort_id) VALUES ('${data.first_name}','${data.last_name}','${data.linkedin}',${data.cohort_id});`

  db.query(person_query,(err, results, fields) => {
    if (err) {
      return console.error(err.message);
      cb(err)
    }
    cb(null, results);
  });


};


const getPerson = (data, cb) => {
  // Get person data
  let person_query = `SELECT * FROM people as p WHERE p.first_name = "${data.first_name}" AND p.last_name = "${data.last_name}";`

  db.query(person_query,(err, results, fields) => {
    if (err) {
      return console.error(err.message);
      cb(err)
    }
    cb(null, results);
  });

}

const getPersonByLinkedIn = (data, cb) => {
  // Get person data
  let person_query = `SELECT * FROM people as p WHERE p.linkedin = "${data.linkedin}";`

  db.query(person_query,(err, results, fields) => {
    if (err) {
      return console.error(err.message);
      cb(err)
    }

    cb(null, results);
  });

}



module.exports = {
  createPerson: createPerson,
  getPerson: getPerson,
  getPersonByLinkedIn: getPersonByLinkedIn
}
