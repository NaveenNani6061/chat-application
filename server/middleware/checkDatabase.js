import mongoose from "mongoose";

const checkDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database not available",
      message: "Please configure MongoDB connection in server/.env file",
      setup: "See MONGODB_SETUP.md for instructions",
    });
  }
  next();
};

export default checkDatabase;
