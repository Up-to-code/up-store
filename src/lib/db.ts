import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    // Connection already established
    return mongoose.connection;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToDatabase;
