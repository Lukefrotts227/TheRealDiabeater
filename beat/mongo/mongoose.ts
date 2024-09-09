import mongoose from 'mongoose';

const CLIENT_URI = process.env.MONGO_URI || null;
if (!CLIENT_URI) {
  throw new Error('Could not find MONGO_URI');
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(CLIENT_URI, {
      serverSelectionTimeoutMS: 5000,  // 5 seconds to select the server
      socketTimeoutMS: 45000,  // 45 seconds inactivity close
      maxPoolSize: 10,  // Limit the number of concurrent connections
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw new Error('MongoDB connection failed');
  }
};

export default connectDB;



