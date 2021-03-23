import React from 'react';
import ConnectionItem from './ConnectionItem.jsx'

function ConnectionLinks({connectionItems, updateConnectionStatus}) {
    let connectionLinks = [];
    Object.entries(connectionItems).forEach((key) =>
     {
       // Grab the person object
      let person = key[1];
      // Create a Connection link React Component
      connectionLinks.push(
        <ConnectionItem
        key = {person.linkedin}
        first_name = {person.first_name}
        last_name = {person.last_name}
        linkedin = {person.linkedin}
        target_id = {person.id}
        status={person.status}
        updateConnectionStatus = {updateConnectionStatus}/>
        )
      })

      return (
        <section>
        <h3> Lets keep the Karma Rolling!</h3>
          {connectionLinks}
        </section>
      )

}

export default ConnectionLinks;