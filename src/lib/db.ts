import mongoose from "mongoose";
const db = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("db already connected");
    return mongoose.connection;
  } else {
    try {
      const conn = mongoose
        .connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
          serverSelectionTimeoutMS: 30000, // 30 seconds
        })
        .then(() => {
          console.log("MongoDB connected");
        })
        .catch((err) => {
          console.error("MongoDB connection error:", err);
        });
      console.log("db connected");
      return conn;
    } catch (err) {
      console.log(err);
    }
  }
};

export default db;
