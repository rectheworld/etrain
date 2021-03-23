
const db = require('../index.js');

const createCohort = (name, junior_name, start_date, cb) => {
  console.log('In createCohort');

  let inputData = {name: junior_name};

  /// get Junior_id if exisits
  getCohortId(inputData, (err, data) => {

    if (err) {
      cb(err, null)
    } else {

      let juniorId = null;
      // if data was returned save the id,
      if (data.hasOwnProperty('cohort_id')) {
        juniorId = data.cohort_id;

      /// Insert the Cohort
      insertCohort(name, juniorId, start_date, (err, data) => {
        if (err) {
          cb(err);
        } else {
          cb(null, data);
        }

      })

      // if not create a cohort for the junior cohort
      } else {
         insertCohort(junior_name, null, null, (err, data) => {
          if (err) {
            cb(err);
          } else {

            juniorId = data.cohort_id;


            /// Insert the Cohort
            insertCohort(name, juniorId, start_date, (err, data) => {
              if (err) {
                cb(err);
              } else {
                console.log('heres your new linked cohort:')
                console.log(data);
                cb(null, data)
              }

            })

          }

        })


      }  // End of if Else on Junior Exisiting

    }

  })  /// End get Junior COhort ID

};


const insertCohort = (name, junior_id, start_date, cb) => {
  console.log('In insertCohort');

  if (name === undefined) {
    return;
  }

  let input_junior_id = junior_id === undefined | junior_id === null ? null : junior_id;

  let input_start_date = start_date === undefined | junior_id === null ? null : `${start_date}`;

  let cohort_query = `INSERT INTO cohort(cohort_name, junior_id, start_date)
  VALUES ('${name}', ${input_junior_id}, ${input_start_date});`

  db.query(cohort_query,  (error, results) => {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query

    if (error) {
      cb(error, null)
    } else {

      /// Get the Id of the newly inserted row
      getCohortId({name}, (err, results) => {
        if (error) {
          cb(error, null)
        } else {

          cb(null, results);
        }

      })

    }

  })


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

} // End getCohortId



module.exports = {
  createCohort: createCohort,
  getCohortId: getCohortId
}
