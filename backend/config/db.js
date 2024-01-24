const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MOGO_URL);
    console.log("====================================");
    console.log(`MongoDB Connected: ${connect.connection.host}`);
    console.log("====================================");
  } catch (err) {
    console.log("====================================");
    console.log(`Error: ${err.message}`.red);
    console.log("====================================");
    process.exit(1);
  }
};

module.exports = connectDb;
