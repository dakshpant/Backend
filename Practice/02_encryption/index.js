import dotenv from "dotenv";
dotenv.config(); // MUST be at the very top

import express from "express";
import route from "./routes/route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", route);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log("EncryptionKey length:", process.env.EncryptionKey?.length);
});
