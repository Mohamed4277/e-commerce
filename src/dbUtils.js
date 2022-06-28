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
/*function dbGetProducts(callBackGet) {
  let connection = connectToMySQL();
  let query = "SELECT * FROM products ORDER BY id desc";
  connection.query(query, callBackGet);
  connection.end;
}*/

function dbGetProducts(afterTreatment) {
  let connection = connectToMySQL();
  let query = "SELECT * FROM products ORDER BY id desc";
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
    }

    connection.commit();
    afterTreatment(error, result);
    connection.end;
  });
  connection.end;
}

// Get clients
/*function dbGetClients(callBackGet) {
  let connection = connectToMySQL();
  let query = "SELECT * FROM clients ORDER BY id desc";
  connection.query(query, callBackGet);
  connection.end;
}*/

// Get clients
function dbGetClients(afterTreatment) {
  let connection = connectToMySQL();
  let query = "SELECT * FROM clients ORDER BY id desc";
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
    }

    connection.commit();
    afterTreatment(error, result);
    connection.end;
  });
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
    afterTreatment(error, result);
    connection.end;
  });
  connection.end;
}

// Insert a new client
function dbAddNewClient(client, afterTreatment) {
  let connection = connectToMySQL();
  let query = `INSERT INTO clients(name,familly_name,password,email) VALUES(?,?,?,?)`;
  connection.query(query, client, (error, result) => {
    if (error) {
      console.log(error);
    }
    connection.commit();
    connection.end;
    afterTreatment(error, result);
  });
  connection.end;
}

// Save order
function dbSaveOrder(session, afterTreatment) {
  let connection = connectToMySQL();
  let query = `INSERT INTO orders(client_id,product_id,quantity) VALUES ?`;
  connection.query(query, [session], (error, result) => {
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
  dbSaveOrder,
  dbGetProducts,
  dbAddProduct,
  dbDeleteProduct,
  dbUpdateProduct,
  dbAddNewClient,
  dbGetClients,
};
