const cors = require("cors");
const express = require("express");
const db = require("./dbUtils");
const app = express();
const port = 3001;
const crypto = require("crypto");
//const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const verifCredentials = require("./utils.js");
const USERS = require("./constante.js");
const _ = require("lodash");

let userBasket = {};

let session;

//app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(
  sessions({
    secret: "thisismysecret",
    cookie: { maxAge: oneDay },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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
  const { id, isAccess, isAdmin } = verifCredentials(
    req.body["name"],
    crypto.createHash("sha256").update(req.body["password"]).digest("hex"),
    USERS
  );
  res.cookie("id", id, {
    maxAge: 9000000,
    httpOnly: true,
  });
  userBasket[id] = { panier: [] };
  session = req.session;
  session.idUser = id;
  session.basket = {};
  res.send({ isAccess, isAdmin });
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

// Add new client
app.post("/add-client", (req, res) => {
  let formData = [
    req.body["name"],
    req.body["familyName"],
    req.body["password"],
    req.body["email"],
  ];
  db.dbAddNewClient(formData, (error, results) => {
    res.send(results);
  });
});

// Save order
app.post("/save-order", (req, res) => {
  const u = _.reduce(
    session.basket,
    function (result, value, key) {
      result = [...result, [session.idUser, parseInt(key, 10), value]];
      return result;
    },
    []
  );
  db.dbSaveOrder(u, (error, results) => {
    res.send(results);
  });
});

// display-cart
app.get("/display-cart", (req, res) => {
  db.dbGetProducts((error, results) => {
    res.send(results);
  });
});

// Add product
app.post("/add-product/:id", (req, res) => {
  if (!session || !session.basket || !session.basket[req.params.id]) {
    session.basket[req.params.id] = 1;
  } else {
    session.basket[req.params.id] = session.basket[req.params.id] + 1;
  }
  res.send();
});

// delete product
app.post("/delete-product/:id", (req, res) => {
  delete session.basket[req.params.id];
  res.send();
});

// update product
app.post("/update-product/:id", (req, res) => {
  if (req.body.nbOfProduct == 0) {
    delete session.basket[req.params.id];
  } else {
    session.basket[req.params.id] = req.body.nbOfProduct;
  }
  res.send();
});

// Delete product
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
