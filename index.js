import express from "express";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("Server up and running on port 4000.");
});
