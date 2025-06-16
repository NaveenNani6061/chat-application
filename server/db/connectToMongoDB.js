import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(
      "MongoDB URI:",
      process.env.MONGODB_URI ? "✓ URI provided" : "✗ URI missing",
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log("💡 Tip: Make sure MongoDB is running or use MongoDB Atlas");
    }

    // Exit process with failure
    process.exit(1);
  }
};

export default connectToMongoDB;
