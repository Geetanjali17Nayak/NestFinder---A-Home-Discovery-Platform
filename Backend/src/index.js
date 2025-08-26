import { dbConnect } from "./config/dbConnect.js";
import { app } from "./app.js";


const startServer = async () => {
  try {
    await dbConnect();
    console.log("MongoDB Connected");

    app.listen(5000, () => console.log("serever started at 5000"));
  } catch (error) {
    console.log("connection failed");
  }
};

startServer();