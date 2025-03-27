import mongoose from "mongoose";

const db_connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_DB_URI);
    console.log("DB_connected");
  } catch (error) {
    console.log("connection_failed");
  }
};

export default db_connection;
