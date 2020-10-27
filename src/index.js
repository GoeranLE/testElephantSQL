require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const client = require("./client");
const app = express();


app.use(bodyParser.json());

app.get("/", (req, res) => {
  client 
  .query("SELECT NOW()")
  .then((data) => res.send(data.rows[0]))
  .catch((err) => res.sendStaus(500));
});

app.get("/api/students", (req, res) => {
  client
  .query("SELECT * FROM students")
  .then((data) => res.json(data.rows))
  .catch((err) => console.log(err));
});

app.get("/api/students/:id", (req,res) => {
const { id } = res.params;
  client
    .query("SELECT * FROM students WHERE id=$1", [id])
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
  });

///hier wirds haarig! 

app.post("/api/students", (req, res) => {
const { first_name, last_name, instructor_id, course_name } = req.body;
const text = 
  "INSERT INTO students(first_name, last_name, instructor_id, course_name) VALUES ($1, $2, $3, $4) RETURNING *";
const values = [first_name, last_name, instructor_id, course_name];
client
  .query(text, values)
  .then((data) => res.json(data.rows))
  .catch((err) => console.log(err));
});

app.put("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, instructor_id, course_name } = req.body;
  const text =
    "UPDATE students SET first_name=$1, last_name=$2, instructor_id=$3, course_name=$4 WHERE id=$5 RETURNING *";
  const values = [first_name, last_name, instructor_id, course_name, id];
  client
    .query(text, values)
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;
  client
    .query("DELETE FROM students WHERE id=$1 RETURNING *", [id])
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});



///////////////////////// ORDERS ///////////////////////////////

app.get("/", (req, res) => {
  client 
  .query("SELECT NOW()")
  .then((data) => res.send(data.rows[0]))
  .catch((err) => res.sendStaus(500));
});

app.get("/api/orders", (req, res) => {
  client
  .query("SELECT * FROM orders")
  .then((data) => res.json(data.rows))
  .catch((err) => console.log(err));
});

app.get("/api/orders/:id", (req,res) => {
const { id } = res.params;
  client
    .query("SELECT * FROM orders WHERE id=$1", [id])
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
  });

app.post("/api/orders", (req, res) => {
const { price, date, user_id } = req.body;
const text = 
  "INSERT INTO students(price, date, user_id) VALUES ($1, $2, $3) RETURNING *";
const values = [price, date, user_id];
client
  .query(text, values)
  .then((data) => res.json(data.rows))
  .catch((err) => console.log(err));
});

app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  const text =
    "UPDATE students SET first_name=$1, last_name=$2, instructor_id=$3, course_name=$4 WHERE id=$5 RETURNING *";
  const values = [price, date, user_id, id];
  client
    .query(text, values)
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});

app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  client
    .query("DELETE FROM orders WHERE id=$1 RETURNING *", [id])
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
});


//////////////OUTPUT///////////

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});