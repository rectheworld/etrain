
const db = require('../index.js');

const createConnection = (id, target_id, status_type, cb) => {

  /// check to see if a record already exisits
  getConnectedId(id, target_id, (err, data) => {

    if (err) {
      cb(err)
    }
    else {

      /// Init what could be an exisiting an Id (might also be undefined)
      let exisitingId = data[0] ? data[0].id : undefined;

      // Create the possible queries
      let create_query = `INSERT INTO connections (person_id,target_id,status_name) VALUES
      (${id}, ${target_id}, '${status_type}');`

      let update_query = `UPDATE connections SET status_name = '${status_type}' WHERE id = ${exisitingId};`

      /// Select the Query to be used
      let query = exisitingId !== undefined ? update_query : create_query;

      // Exicute
      db.query(query,(err, results) => {
        if (err) {
          cb(err)
        }
        cb(null, results);
      });

    } // End of Else

  }) // End of getConnectedId



};


const getConnectedId = (id, target_id, cb) => {
  console.log('In getConnectedId')

  let query = `SELECT * FROM connections as c
  WHERE c.person_id = ${id} AND c.target_id = ${target_id};`

  db.query(query,(err, results) => {
    if (err) {
      cb(err)
    }
    cb(null, results);
  });

};






const getUnConnectedList = (id, cohort_id, cb) => {
    let person_query = `
    --  Select all the people who we dont have a connection with
    SELECT p.id, p.first_name, p.last_name, p.linkedin, p.cohort_id, COUNT(c.person_id) as num_connections, 0 as friended FROM etrain.people AS p
    --     Get the connection data (is used for ordering)
        LEFT JOIN etrain.connections as c ON p.id = c.person_id
    -- Limit the results to the target person who are either not conencted at all or friended
    WHERE (
      p.id NOT IN (SELECT target_id FROM etrain.people as p
        INNER JOIN etrain.connections as c ON p.id = c.person_id
        WHERE p.id = ${id})
          )
      AND p.cohort_id = ${cohort_id}
      AND p.id != ${id}
    --     Group the results by id for aggregating the num_connections
        GROUP BY p.id


    --  Now combine  with the people who are friended
        UNION ALL


        SELECT p.id, p.first_name, p.last_name, p.linkedin, p.cohort_id, COUNT(c.person_id) as num_connections, 1 as friended FROM etrain.people AS p
    --     Get the connection data (is used for ordering)
        LEFT JOIN etrain.connections as c ON p.id = c.person_id
    -- Limit the results to the target person who are either not conencted at all or friended
    WHERE (
          p.id IN (SELECT target_id FROM etrain.people as p
        INNER JOIN etrain.connections as c ON p.id = c.person_id
        WHERE p.id = ${id} and c.status_name = 'friended'
            )
          )
      AND p.cohort_id = ${cohort_id}
      AND p.id != ${id}
    --     Group the results by id for aggregating the num_connections
        GROUP BY p.id
    --     Order by the number of connections descending
        ORDER BY num_connections DESC;`

    db.query(person_query,(err, results) => {
      if (err) {
        cb(err)
      }
      cb(null, results);
    });


}



const getConnectionMetrics = (person_id, cohort_id, junior_id, cb) => {
  console.log('In getConnectionMetrics')

  let query = `SELECT
  ( SELECT COUNT(CASE WHEN c.status_name = 'endorsed' THEN 1 ELSE 0 END)
  FROM people as p
  LEFT JOIN etrain.connections as c ON p.id = c.person_id
  WHERE p.id = ${person_id} AND p.cohort_id = ${cohort_id} AND c.status_name = 'endorsed'
  GROUP BY p.id) as num_endorsed_self,

(SELECT COUNT(p.id)
  FROM people as p
  WHERE p.cohort_id = ${cohort_id}) as num_cohort_self,

  ( SELECT COUNT(CASE WHEN c.status_name = 'endorsed' THEN 1 ELSE 0 END)
  FROM people as p
  LEFT JOIN etrain.connections as c ON p.id = c.person_id
  WHERE p.id = ${person_id} AND p.cohort_id = ${junior_id} AND c.status_name = 'endorsed'
  GROUP BY p.id) as num_endorsed_junior,

(SELECT COUNT(p.id)
  FROM people as p
  WHERE p.cohort_id = ${junior_id}) as num_cohort_junior;`



  db.query(query,(err, results) => {
    if (err) {
      cb(err)
    }
    console.log(results);
    results[0]['num_endorsed_self'] = !results[0]['num_endorsed_self'] ? 0 : results[0]['num_endorsed_self'];

    results[0]['num_endorsed_junior'] = !results[0]['num_endorsed_junior'] ? 0 : results[0]['num_endorsed_junior'];

    cb(null, results);
  });

};

const getEndorsedConnections = (id, cb) => {

  let query = `SELECT p.id, p.first_name, p.last_name, p.linkedin, p.cohort_id FROM etrain.people AS p
  -- Limit the results to the target person who are either not conencted at all or friended
  WHERE (
        p.id IN (SELECT target_id FROM etrain.people as p
      INNER JOIN etrain.connections as c ON p.id = c.person_id
      WHERE p.id = ${id} AND c.status_name = 'endorsed'
          )
      )
      AND p.id != ${id};`

  db.query(query,(err, results) => {
    if (err) {
      cb(err)
    }
    cb(null, results);
  });

}


module.exports = {
  createConnection: createConnection,
  getUnConnectedList: getUnConnectedList,
  getConnectedId: getConnectedId,
  getConnectionMetrics: getConnectionMetrics,
  getEndorsedConnections: getEndorsedConnections
}
