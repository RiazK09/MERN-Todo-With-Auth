const mongoose = require("mongoose");

/* Connect to MongoDB.
• uri for connecting to the database is obtained from Atlas>Connect from your app.
Since I have deployed my app to GitHub, I have NOT left my password visible. 
See .env file for more information. */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
