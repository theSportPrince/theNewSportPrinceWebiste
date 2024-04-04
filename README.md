How to Setup Locally This Project

Step1:-Install Node js (Latest version)
Step 2:-CLone This Repository
Step 3:- cd to frontend and hit npm -f i
Step 4:- cd to backend and hit npm -f i
Step 5:-Create .git both in frontend  and backend folder
Step 6:-Initalize all the required varaible 

example frontend .git file
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_SECRET_KEY="google develoeper account secret key"
REACT_APP_TOKEN="your google developer accont token"
REACT_APP_ACCESS_KEY="google developer account access key"
REACT_APP_NEW_APIKEY="news api key"

example backend .git file
PORT=5000

MONGODB_URI="secret url"
CLIENT_ID=" google client id"
CLIENT_SECRET="google client secret"
CLIENT_URL=http://localhost:3000

step 7:cd to frontend and hit npm start
step 8:cd to backend and hit nodemon index.js
