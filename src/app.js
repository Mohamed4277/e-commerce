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

// Add product
app.post("/add-product/:id", (req, res) => {
  if (!session || !session.basket || !session.basket[req.params.id]) {
    session.basket[req.params.id] = {
      nb: 1,
    };
  } else {
    session.basket[req.params.id] = {
      nb: session.basket[req.params.id].nb + 1,
    };
  }
  console.log("**********", session);
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
