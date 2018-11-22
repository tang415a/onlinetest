# onlinetest
An online JavaScript test app

This app is an html5 based web app that can establish and conduct online test sessions for users. Currently a JavaScript language bank has been created and the app will randomly select a certain number (thirty) of single-choice questions to constitute the quiz. The user needs to submit the answer for each question within a certain period of time (two minutes). In the end, a report including the score and cost time will be generated on the server side. The user can start the test session by either signing up or visiting a URL included in the request sent to his/her email box in advance.

Most of the quiz came from JavaScript interview repositories on Github, including:
1. 123-JavaScript-Interview-Questions (https://github.com/ganqqwerty/123-Essential-JavaScript-Interview);
2. Essential JavaScript Interview Questions (https://github.com/apoterenko/javascript-interview-questions);
3. JS interview questions (https://github.com/vvscode/js--interview-questions).

Bootstrap library was used in frontend development and the responsive design was enabled. The backend for this app was written in Node.js. An installation of the latest security patch of Node (8.12.x or higher) is recommended.

## Run on Localhost
1. Install dependencies for backend: 
    * `cd src/backend/`
    * `npm install`
2. Start the backend: 
    * `cd src/backend/src/`
    * `node server.js`
3. Visit the frontend inside the browser (default address: http://localhost:3000).

## Routes
1. http://localhost:3000/signup
    The user can sign up with his/her profile (name & email address) and start the session immediately.
2. http://localhost:3000
    The administrator can sign up for a user and send the request to his/her email box automatically. To do that, you need to provide the email service (including the user account credential for outbox) to nodemailer at Ln. 56 to Ln. 66 in `src/backend/src/server.js`.

## Snapshots
1. Sign up
![alt text](https://github.com/tang415a/onlinetest/blob/master/imgs/signup.png)

2. Instructions
![alt text](https://github.com/tang415a/onlinetest/blob/master/imgs/instructions.png)

3. Quiz
![alt text](https://github.com/tang415a/onlinetest/blob/master/imgs/quiz.png)
