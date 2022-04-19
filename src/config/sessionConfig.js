const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: process.env.SESSION_COLLECTION_NAME,
});

// Catch error event on store
store.on("error", function (error) {
  console.log(error);
});

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 },
  store,
});

module.exports = sessionConfig;
