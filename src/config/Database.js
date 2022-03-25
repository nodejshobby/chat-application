const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connect();
