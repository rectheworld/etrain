
const db = require('../index.js');

const createCohort = (data, cb) => {
  console.log('In createCohort');
};


const getCohortId = (data, cb) => {

  let cohort_query = `SELECT c.id FROM cohort AS c WHERE c.cohort_name = '${data.name}'`

  db.query(cohort_query,  (error, results) => {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query

    if (error) {
      cb(error, null)
    } else {
      cb(null, results[0].id);
    }


  })


}



module.exports = {
  createCohort: createCohort,
  getCohortId: getCohortId
}
