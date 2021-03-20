
const db = require('../index.js');

const createCohort = (data, cb) => {
  console.log('In createCohort');
};


const getCohortId = (data, cb) => {

  let cohort_query = `SELECT c.id as 'cohort_id', c.junior_id as 'junior_id', c2.id as 'senior_id'
  FROM cohort AS c
  LEFT JOIN cohort as c2 ON c.id = c2.junior_id
  WHERE c.cohort_name = '${data.name}'`



  db.query(cohort_query,  (error, results) => {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query

    if (error) {
      cb(error, null)
    } else {
      results = results[0];
      cb(null, {... results});
    }


  })


}



module.exports = {
  createCohort: createCohort,
  getCohortId: getCohortId
}
