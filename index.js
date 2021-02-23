const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: 1,
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: 2,
    username: "Skyler",
    comment: "I like bird watching with my dog",
  },
  {
    id: 3,
    username: "Sk8erBoi",
    comment: "Plz delete your account Todd",
  },
  {
    id: 4,
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
  {
    id: 5,
    username: "Jeff",
    comment: "none of you really exist",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments/new", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  res.render("comments/show", { comment });
});

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
