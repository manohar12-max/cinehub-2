import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async ():Promise<void>  => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI || " ", {
        dbName: "CineHub",
      });
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (e) {
      console.log("Error connecting to MongoDB", e);
    }
  }
};
