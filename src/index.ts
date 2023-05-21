import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
const app: Application = express();

// using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { URI } = process.env;
const port = process.env.PORT || 5000;

// Connect mongoose
const dbconnect = async (): Promise<void> => {
  if (!URI) {
    throw new Error("URL is not defined");
  }
  await mongoose.connect(URI).then(() => {
    console.log("Database is connected");
    // Database connection
    const databaseName = mongoose.connection;

    //  Collection Name
    const practiceDataCollection = databaseName.collection("practiceData");

    // Create getAPI
    app.get("/users", async (req, res) => {
      const users = await practiceDataCollection.find().toArray();

      res.send(users);
    });
  });
};
dbconnect();

app.get("/", (req, res) => {
  res.send({
    message: "Server is running...",
    status: 200,
  });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
