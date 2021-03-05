import React from 'react';

const UpdateConfirmation = ({ rsvp }) => {
  return (
    <div>
      <p>
        {`${rsvp.firstName}, we\'ve updated your RSVP so that you and your ${rsvp.guests} guests are now on the list.
        We\'ll send an email confirmation to ${rsvp.email}.`}
      </p>
    </div>
  );
};

export default UpdateConfirmation;