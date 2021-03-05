# RSVP Form - Full Stack

Build a simple full-stack RSVP form to allow users to respond to their invitation to *_The Party*.

( *_The Party* is private.)

## Requirements:

Complete ALL Bare Minimums before moving forward to the Advanced Content.

#### Bare Minimum Requirements

##### Client:

- Create a form with React that:
  - Takes in the following input:
    - First Name
    - Last Name
    - Email Address 
    - Number of Guests
  - Requires all input fields to have a value before a submission can be made.
  - Performs input validation on the email address.
    (Email must be of form `local@domain`.)
  - Upon submission, sends the RSVP data to your Express server.

##### Server:
- Create an endpoint called `/rsvps` in your Express server with a request handler that:
  - Invokes a database controller function that updates or creates a new document in your MongoDB collection, `rsvps`.

##### Database:
- Implement a database controller function that will update an existing rsvp record if a matching one exists or create one if it does not, in the file `/database/controllers/rsvp.js`.

#### Advanced Content
- Add a RSVP list view that shows the names of the people attending
- Refactor your request handler so that it: 
  - Responds to the client with the modified document, rather than the original 
  - Responds with appropriate status codes for **all situations**.  These include:
      - Internal Server Error - Something went wrong.
      - No record was found, so one was created.
      - A record was found, so it was updated. 
- Once the form is submitted and a response is returned, render an approriate confirmation view. Two are provided for you at the following paths:
  - `/client/src/components/InsertConfirmation.jsx`
  - `/client/src/components/UpdateConfirmation.jsx`

## Available Resources:

- [MDN](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [NPM](https://www.npmjs.com/)
- [React Documentation](https://reactjs.org/docs/hello-world.html)
- [Express Documentation](https://expressjs.com/en/api.html)
- [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
