# BerhentiAPI

This is the API used in the Berhenti application.

Berhenti is a mobile app that helps users combat their addictive behaviors in a communal and accountable way. Users are able to build their community of friends via a doubly-blind friend system, which connects users to aid each other in their journeys towards battling addiction. Users are able to log triggers, relapses, and milestones, all of which make up and contribute to the feed. Users can also send pokes, which act as a means for users to kindly send a nudge of encouragement with a message of support. The app's home page displays a tree, and the growth level of the tree aligns with the user's streak, resetting to a sappling on relapse.

**Deployed Link:** https://berhenti-api.onrender.com/

## Architecture

TODO:  descriptions of code organization and tools and libraries used

We maintained the babel express backend setup from the starter pack. Backend is built with numerous models: user, feed, milestone, trigger, relapse, poke, and a user_pokes, which acts as a wrapper for poke objects. We included both service and controller methods to separate generic CRUD methods from more detailed and tailored use cases. Additionally, we included a friend service and controller for clarity to separate methods pertaining to handling friends and handling users themselves.

## Setup

TODO: how to get the project dev environment up and running, npm install etc

* Clone repo to local
* Run `npm install` to ensure that all packages are installed
* To start running the project locally, use `npm run start`

## Deployment

We deployed the project via Render. The backend is deployed as a Web Service. The build command is `npm install && npm run build`, and the start command is `npm run prod`. We have one environment variable, which is our MongoDB URI.

## Authors

Alexander Huang-Menders, Bo Kim, Will Elliott, Will Balkan, Daniel Lubliner, Ryan Kim

## Acknowledgments
