const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const router = require("./routers/index");
const errorHandling = require("./middleware/errorHandling");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandling);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
