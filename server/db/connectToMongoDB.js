import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI ? "✓ URI provided" : "✗ URI missing",
    );

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log("💡 Tip: Make sure MongoDB is running locally");
      console.log(
        "💡 Or update MONGODB_URI in server/.env to use MongoDB Atlas",
      );
    }

    if (error.message.includes("ENOTFOUND")) {
      console.log("💡 Tip: Check your MongoDB Atlas connection string");
      console.log(
        "💡 Make sure to replace <username>, <password>, and cluster details",
      );
    }

    console.log("⚠️  Server will continue running without database connection");
    console.log("📝 Update your MongoDB configuration in server/.env file");
  }
};

export default connectToMongoDB;
