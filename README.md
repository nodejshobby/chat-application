# chat-application with authentication

This app uses ejs as template engine, socket.io node modules for the implementation of the socket programming for the Chat Application, Passportjs for the authentication with bcryt node module for hashing the user password, express validator for validation of user inputs.

#### This app implements private Room chatting system with all chats saved in mongodb database for persistence purpose

## To run this app Room Seeder

`node src/seeder/roomSeeder`

## Create a .env file with the following key-value structure in the root folder

DB_URL=put Database connection URI here <br/>
SESSION_SECRET=put something random and secret here <br/>
chatAppName=Chatter <br/>
SESSION_COLLECTION_NAME=chatSessions <br/>

## To run this app locally run

```
npm install
npm run start
```

## An instance of this app is running @ https://chatvivy.herokuapp.com
