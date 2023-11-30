require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos, ver logs');
  }
};

module.exports = {
  dbConnection,
};
