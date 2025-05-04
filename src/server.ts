import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";
dotenv.config();

// Connect to database
connectDB()
  .then(() => {
    console.log("Database connected successfully");

    // Start server
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err: Error) => {
      console.error("Unhandled Rejection:", err);
      server.close(() => process.exit(1));
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
