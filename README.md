# Setup Instructions

- Go into mail-reader-backend and run `docker compose up`. This will install and set up postgres with pgAdmin.
- Make sure to do `npm install` in both mail-reader-backend and mail-reader-frontend folders.
- To retrieve mail data you'll have to go into mail-reader-backend and do `node index.js`. Terminal will display for you a login link to Microsoft and a verification code. You'll have to give permission before the app can use the API in your name.
- After retrieving email, do `npm start` from mail-reader-backend and another `npm start` from mail-reader-frontend. You should now be able to navigate to `localhost:3000` and see a list of mails. Clicking on any of them will display the entire email thread.
