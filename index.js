const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//fake db
const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like bird watching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
  {
    id: uuid(),
    username: "Jeff",
    comment: "none of you really exist",
  },
];
//see all comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});
//new comment form
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
//make a new comment
app.post("/comments/new", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});
//get specific comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render("comments/show", { comment });
});
//edit backend functionality
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const oldComment = comments.find((comment) => comment.id === id);
  oldComment.comment = newComment;
  res.redirect("/comments");
});
//edit form
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render("comments/edit", { comment });
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
