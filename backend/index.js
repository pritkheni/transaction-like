const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { User } = require("./models/db");
const connectDb = require("./config/db");
const mainRouter = require("./routes/mainRouter");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
connectDb();
app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`backend running listening on ${PORT}`);
  console.log(`visit : http://localhost:${PORT}`);
  console.log("====================================");
});
