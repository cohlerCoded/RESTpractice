const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Okay here are your ${qty} ${meat} tacos`);
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
