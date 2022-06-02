const cors = require("cors");
const express = require("express");
const db = require("./dbUtils");
const app = express();
const port = 3001;
const crypto = require("crypto");

const verifCredentials = require("./utils.js");
const USERS = require("./constante.js");

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get products
app.get("/get-products", (req, res) => {
  db.dbGetProducts((error, results) => {
    res.send(results);
  });
});

//Login
app.post("/login", (req, res) => {
  const resultsVerifCredentials = verifCredentials(
    req.body["name"],
    crypto.createHash("sha256").update(req.body["password"]).digest("hex"),
    USERS
  );
  res.send(resultsVerifCredentials);
});

// Add product
app.post("/add-product", (req, res) => {
  let formData = [
    req.body["name"],
    req.body["description"],
    req.body["price"],
    req.body["image"],
  ];
  db.dbAddProduct(formData, (error, results) => {
    res.send(results);
  });
});

// Delete product
/*app.post("/delete-product", (req, res) => {
  let formData = [req.body["id"]];
  db.dbDeleteProduct(formData);
});*/

// Delete task
app.post("/delete-product", (req, res) => {
  let formData = [req.body["id"]];
  db.dbDeleteProduct(formData, (error, results) => {
    res.send(results);
  });
});

// Update product
app.post("/update-product", (req, res) => {
  let formData = [
    req.body["name"],
    req.body["description"],
    req.body["price"],
    req.body["image"],
    req.body["id"],
  ];
  db.dbUpdateProduct(formData, (error, results) => {
    res.send(results);
  });
});
