const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Disconnect any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
