
const db = require('../index.js');

const createPerson = (data, cb) => {

  let person_query = `INSERT INTO people(first_name,last_name,linkedin,cohort_id) VALUES ('${data.first_name}','${data.last_name}','${data.linkedin}',${data.cohort_id});`

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
  let person_query = `SELECT p.id, p.first_name, p.last_name, p.linkedin, p.cohort_id, cs.id as 'senior_id',  cj.junior_id as 'junior_id'
  FROM people as p
  LEFT JOIN etrain.cohort as cs ON p.cohort_id = cs.junior_id
  LEFT JOIN etrain.cohort as cj ON p.cohort_id = cj.id
  WHERE p.linkedin = "${data.linkedin}";`

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
