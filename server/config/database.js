const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let connectionString = process.env.MONGODB_URI;
    
    // If no MongoDB URI is provided, use a default local connection for development
    if (!connectionString) {
      connectionString = 'mongodb://localhost:27017/taskmanager';
      console.log('No MongoDB URI found, using local MongoDB');
    }

    console.log('Connecting to MongoDB...');
    console.log('Connection string:', connectionString.replace(/\/\/.*@/, '//***:***@'));

    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Log database name
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('ENOTFOUND') || error.message.includes('connection refused')) {
      console.log('\nTroubleshooting:');
      console.log('1. Make sure MongoDB is installed and running locally');
      console.log('2. Or update MONGODB_URI in .env to use MongoDB Atlas');
      console.log('3. MongoDB Atlas: https://www.mongodb.com/atlas');
    }
    
    process.exit(1);
  }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Close connection on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = connectDB;