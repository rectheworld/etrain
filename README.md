
# E-Train Intro
The E-Train (AKA Endorsement Train but Ren can't spell endorsement constantly enough to call it that) is a online app to make it easy for Hack Reactor Students to build an online relationships with their peers.

A Peer group in the app are people who are
	- In the Same Cohort as the person
	- In the Senior or Junior Cohort to that person
	- Are in a Cohort that graduated at the same time as a person.

If a Hack Reactor Grad can successfully network and endorse all the persons in theres groups, that would mean 90 Connections and Endorsements to help kick start their engineering careers.

## Quick Start Development
1. Clone the Repo
2.  Run ```npm install```
3.  Create a .env file
```
DB_HOST=<ASK DB OWNER>
DB_USER=<ASK DB OWNER>
DB_PASSWORD=<ASK DB OWNER>
DB_DATABASE=<ASK DB OWNER>
```

4. Start Webpack with ```npm run react-dev```
5. Start Local Server with ```npm run start:dev```

## Workflow for Change Requests and Bug Squashes
1. Create an Issue. Please detail the task you are completing.
2.  Create a branch called 'feature/<Your issues Number>
Example, if your github issue is #133 your branch would be feature/133
3. When you submit commits, include a #yourIssueID
Example:  "#133 Changed the Color of the Title Page"
4. Create a Pull request to the TEST-MASTER branch. Request from a someone who is not you.


## Front End Pages
- App
	Entry point the app.
	TODO: THERE IS NO REAL ROUTING RIGHT NOW
		Routing is currently handled by creating a map of pages called "pageMap" where the key is a string representing the desired page.  The map returns the JSX React object which is passes to the return command.
- Check Presence
	Will use a linkedin link to determine if a user is already part of the endorsement train. If not, will take the user to the Add User Page. If a user is in the train, will go to Welcome Page

- Add User
	Used to add a user to the Endorsement Train.

- Welcome
	The landing page for users already in the endorsement Train


## API Routes



