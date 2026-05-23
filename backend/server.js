const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SRMS",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});





app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=?";

  db.query(sql, [username], (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    if (result.length === 0) {
      return res.json({ message: "User Not Found" });
    }

    bcrypt.compare(password, result[0].password, (err, same) => {

      if (err) {
        return res.json({ message: "Compare Error" });
      }

      if (same) {

        req.session.user = result[0];

        res.json({
          message: "Login Success",
          user: result[0]
        });

      } else {

        res.json({
          message: "Password Not Match"
        });

      }

    });

  });

});





app.get("/logout", (req, res) => {

  req.session.destroy();

  res.json({
    message: "Logout Success"
  });

});





app.get("/session", (req, res) => {

  if (req.session.user) {

    res.json({
      user: req.session.user
    });

  } else {

    res.json({
      message: "No Session"
    });

  }

});





app.get("/items", (req, res) => {

  const sql = "SELECT * FROM items";

  db.query(sql, (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    res.json(result);

  });

});





app.post("/add_item", (req, res) => {

  const {
    itemName,
    Specification,
    UnitMeasure,
    Quantity,
    UnityPrice,
    TotalQuantity
  } = req.body;

  const sql = `
    INSERT INTO items
    (itemName,Specification,UnitMeasure,Quantity,UnityPrice,TotalQuantity)
    VALUES(?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      itemName,
      Specification,
      UnitMeasure,
      Quantity,
      UnityPrice,
      TotalQuantity
    ],
    (err) => {

      if (err) {
        return res.json({ message: "SQL Error" });
      }

      res.json({
        message: "Item Added Successfully"
      });

    }
  );

});





app.put("/update_item/:id", (req, res) => {

  const { id } = req.params;

  const {
    itemName,
    Specification,
    UnitMeasure,
    Quantity,
    UnityPrice,
    TotalQuantity
  } = req.body;

  const sql = `
    UPDATE items
    SET itemName=?,
    Specification=?,
    UnitMeasure=?,
    Quantity=?,
    UnityPrice=?,
    TotalQuantity=?
    WHERE item_id=?
  `;

  db.query(
    sql,
    [
      itemName,
      Specification,
      UnitMeasure,
      Quantity,
      UnityPrice,
      TotalQuantity,
      id
    ],
    (err) => {

      if (err) {
        return res.json({ message: "SQL Error" });
      }

      res.json({
        message: "Item Updated Successfully"
      });

    }
  );

});





app.delete("/delete_item/:id", (req, res) => {

  const sql = "DELETE FROM items WHERE item_id=?";

  db.query(sql, [req.params.id], (err) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    res.json({
      message: "Item Deleted Successfully"
    });

  });

});





app.get("/sales", (req, res) => {

  const sql = `
    SELECT 
    s.sales_id,
    s.sales_date,
    s.TotalPrice,
    u.username
    FROM sales s
    JOIN users u
    ON s.user_id=u.user_id
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    res.json(result);

  });

});





app.post("/sales", (req, res) => {

  const { user_id, item_id, QuantitySold } = req.body;

  const sql = "SELECT * FROM items WHERE item_id=?";

  db.query(sql, [item_id], (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    if (result.length === 0) {
      return res.json({ message: "Item Not Found" });
    }

    const item = result[0];

    if (item.Quantity < QuantitySold) {
      return res.json({ message: "Stock Not Enough" });
    }

    const total = item.UnityPrice * QuantitySold;

    const sql2 = `
      INSERT INTO sales(user_id,TotalPrice)
      VALUES(?,?)
    `;

    db.query(sql2, [user_id, total], (err, result2) => {

      if (err) {
        return res.json({ message: "Insert Sales Error" });
      }

      const sales_id = result2.insertId;

      const sql3 = `
        INSERT INTO salesdetail
        (sales_id,item_id,QuantitySold,SubTotalPrice)
        VALUES(?,?,?,?)
      `;

      db.query(
        sql3,
        [sales_id, item_id, QuantitySold, total],
        (err) => {

          if (err) {
            return res.json({ message: "Insert Detail Error" });
          }

          const sql4 = `
            UPDATE items
            SET Quantity=Quantity-?,
            TotalQuantity=TotalQuantity-?
            WHERE item_id=?
          `;

          db.query(
            sql4,
            [QuantitySold, QuantitySold, item_id],
            (err) => {

              if (err) {
                return res.json({ message: "Update Stock Error" });
              }

              res.json({
                message: "Sale Added Successfully"
              });

            }
          );

        }
      );

    });

  });

});





app.get("/users", (req, res) => {

  const sql = `
    SELECT user_id,username,role
    FROM users
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    res.json(result);

  });

});





app.post("/create-account", (req, res) => {

  const { username, password, role } = req.body;

  const sql = "SELECT * FROM users WHERE username=?";

  db.query(sql, [username], (err, result) => {

    if (err) {
      return res.json({ message: "SQL Error" });
    }

    if (result.length > 0) {
      return res.json({ message: "User Already Exist" });
    }

    const hash = bcrypt.hashSync(password, 10);

    const sql2 = `
      INSERT INTO users(username,password,role)
      VALUES(?,?,?)
    `;

    db.query(sql2, [username, hash, role], (err) => {

      if (err) {
        return res.json({ message: "Insert Error" });
      }

      res.json({
        message: "Account Created Successfully"
      });

    });

  });

});





app.listen(5000, () => {
  console.log("Server Running");
});