const cors = require("cors");
const express = require("express");
const db = require("./dbUtils");
const app = express();
const port = 3001;
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const verifCredentials = require("./utils.js");
const _ = require("lodash");

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(
  session({
    secret: "keyboard cat",
    test: 34,
    cookie: { maxAge: 600000, nbView: 0 },
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

let sessions = { basket: {} };

// Get products
app.get("/get-products", (req, res) => {
  db.dbGetProducts((error, results) => {
    res.send(results);
  });
});

//Login
app.post("/login", (req, res) => {
  db.dbGetClients((error, results) => {
    const { id, isAccess, isAdmin } = verifCredentials(
      req.body["name"],
      crypto.createHash("sha256").update(req.body["password"]).digest("hex"),
      results
    );
    sessions.idUser = id;
    res.send({ isAccess, isAdmin });
  });
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
    crypto.createHash("sha256").update(req.body["password"]).digest("hex"),
    req.body["email"],
  ];
  db.dbAddNewClient(formData, (error, results) => {
    res.send(results);
  });
});

// Save order
app.post("/save-order", (req, res) => {
  if (
    sessions &&
    sessions.basket &&
    sessions.idUser > 0 &&
    Object.keys(sessions.basket).length > 0
  ) {
    const u = _.reduce(
      sessions && sessions.basket,
      function (result, value, key) {
        result = [
          ...result,
          [sessions.idUser, parseInt(key, 10), value === undefined ? 0 : value],
        ];
        return result;
      },
      []
    );
    db.dbSaveOrder(u, (error, results) => {
      res.send(results);
    });
  }
});

// display-cart
app.get("/display-cart", (req, res) => {
  db.dbGetProducts((error, results) => {
    res.send(results);
  });
});

// Add product
app.post("/add-product/:id", (req, res) => {
  if (!sessions || !sessions.basket || !sessions.basket[req.params.id]) {
    sessions.basket[req.params.id] = 1;
  } else {
    sessions.basket[req.params.id] = sessions.basket[req.params.id] + 1;
  }
  res.send();
});

// update product
app.post("/update-product/:id", (req, res) => {
  if (req.body.nbOfProduct == 0) {
    delete session.basket[req.params.id];
  } else {
    sessions.basket[req.params.id] = req.body.nbOfProduct;
  }
  res.send();
});

// get nb of a product in basket
app.get("/get-nb-product/:id", (req, res) => {
  res.send(sessions.basket[req.params.id]);
});

// get nb of a product in basket
app.get("/get-nb-product", (req, res) => {
  res.send(sessions.basket);
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

module.exports = app;
