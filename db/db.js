const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log(process.env.API_KEY);
    console.log(process.env.MONGODB);
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
