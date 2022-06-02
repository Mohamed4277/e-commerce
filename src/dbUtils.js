const mysql = require("mysql");

// Connect to MySQL
function connectToMySQL() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "products",
  });
  connection.connect();
  return connection;
}

// Get products
function dbGetProducts(callBackGet) {
  let connection = connectToMySQL();
  let query = "SELECT * FROM products ORDER BY id desc";
  connection.query(query, callBackGet);
  connection.end;
}

// Insert a product
function dbAddProduct(produit, afterTreatment) {
  let connection = connectToMySQL();
  let query = `INSERT INTO products(name,description,price,image) VALUES(?,?,?,?)`;
  connection.query(query, produit, (error, result) => {
    if (error) {
      console.log(error);
    }
    connection.commit();
    connection.end;
    afterTreatment(error, result);
  });
  connection.end;
}

// Delete a product
function dbDeleteProduct(task, afterTreatment) {
  let connection = connectToMySQL();
  let query = `DELETE FROM products WHERE id =?`;
  connection.query(query, task, (error, result) => {
    if (error) {
      console.log(error);
    }
    connection.commit();
    connection.end;
    afterTreatment(error, result);
  });
}

// Update a product
function dbUpdateProduct(produit, afterTreatment) {
  let connection = connectToMySQL();
  let query = `UPDATE products SET name=?,description=?,price=?,image=? WHERE id =?`;
  connection.query(query, produit, (error, result) => {
    if (error) {
      console.log(error);
    }
    connection.commit();
    connection.end;
    afterTreatment(error, result);
  });
  connection.end;
}

module.exports = {
  dbGetProducts,
  dbAddProduct,
  dbDeleteProduct,
  dbUpdateProduct,
};