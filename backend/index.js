const express = require("express");
const app = express();
const port = 3000;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "grocery-informants.cpgputsuo8r5.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "69uTaQVVYLvKCLdTEdSb",
  database: "groceryinformants",
  port: '3306'
});

// app.get("/users", (req, res) => {
//     con.query("SELECT * FROM users", function (err, result, fields) {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/cart", (req, res) => {
//     con.query("SELECT * FROM items WHERE user = '" + user + "'", function (err, result, fields) {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/searches", (req, res) => {
//     con.query("SELECT * FROM searches", function (err, result, fields) {
//         if (err) throw err;
//         res.send(result);
//     });
// });

app.get("/login", (req, res) => {
    let user = req.query.user;
    let password = req.query.password;
    con.query("SELECT * FROM Users WHERE user = '" + user + "' AND Password = '" + password + "' LIMIT 0, 1", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/signup", (req, res) => {
    let user = req.query.user;
    let password = req.query.password;
    con.query("INSERT INTO Users (user, password, zip) VALUES ('" + user + "', '" + password + "', 0)", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/additem", (req, res) => {
    let user = req.query.user;
    let description = req.query.description;
    let price = req.query.price;
    let store = req.query.store;
    con.query("INSERT INTO Items (user, description, price, store) VALUES ('" + user + "', '" + description + "', '"
                             + price + "','" + store + "')", function (err, result, fields) {
        if (err) throw err;
    });
});

app.get("/addsearch", (req, res) => {
    let user = req.query.user;
    let search = req.query.search;
    con.query("INSERT INTO Searches (user, search) VALUES ('" + user + "', '" + search + "')", function (err, result, fields) {
        if (err) throw err;
    });
});

app.get("/removeitem", (req, res) => {
    let user = req.query.user;
    let description = req.query.description;
    con.query("DELETE FROM Items where (user = '" + user + "' AND description = '" + description + "') LIMIT 1", function (err, result, fields) {
        if (err) throw err;
    });
});

app.get("/emptycart", (req, res) => {
    let user = req.query.user;
    con.query("DELETE FROM Items WHERE user ='" + user + "'", function (err, result, fields) {
        if (err) throw err;
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});