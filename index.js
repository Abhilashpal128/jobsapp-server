const express = require("express");
const baseRoute = require("./routes");
const cors = require("cors");
const { DBconnection } = require("./connection");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
// const corsOptions = {
//   origin: "http://localhost:5173/", // Replace with your front-end URL
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// };
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", baseRoute);

DBconnection(process.env.MONGO_URL).then(() => {
  console.log("Database Connected Succesfully");
});

app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
});
