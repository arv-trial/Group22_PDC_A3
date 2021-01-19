const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT *, company.company_name as id FROM company', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.put("/:company", function (req, res) {
    let id = req.params["company"];
    let body = req.body
    let description = req.params.description;
    let base = req.params.base;
    connection.query(
      "UPDATE `company` SET ? WHERE `company_name` = ?",
      [body,id],
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.end(JSON.stringify(results));
      }
    );
  });
  
  // FIXME: 
  app.post("/", (req, res) => {
    console.log("Trying to create a new user...");
    console.log("How do we get the data?");
  
    let body = req.body;
  
    console.log("req.body", req.body);
  
    const queryString = "INSERT INTO `company` SET ?";
    connection.query(
      queryString,
      [body],
      (err, result, fields) => {
        if (err) {
          console.log("Failed to insert new user:" + err);
          res.sendStatus(500);
          return;
        }
  
        // console.log('Insert a new user with id: ', result.insertedId);
        console.log("result", result);
        res.status(200).json(result);
        // res.end()
      }
    );
  });
  
//   app.get("/", (req, res) => {
//     connection.query("SELECT * FROM company", (err, rows, fields) => {
//       console.log("Thanh cong");
//       console.log("rows", rows);
//       const result = rows.map((row) => ({ ...row, id: row.insurance_id }));
//       console.log("result", result);
  
//       res.header("Access-Control-Expose-Headers", "Content-Range");
//       res.header("Content-Range", "bytes : 0-9/*");
  
//       res.json(result);
//     });
//   });
  
//   app.delete("/:delete_id", (req, res) => {
//     const id = req.params["delete_id"];
//     console.log("id", id);
//     // const query = `DELETE FROM patient WHERE insurance_id =  ${id} `
//     connection.query(
//       "DELETE FROM company WHERE company_name = ?",
//       [id],
//       (err, rows, fields) => {
//         console.log("rows", rows);
//         if (!err) {
//           connection.query(
//             "DELETE FROM company WHERE insurance_id =  ?",
//             [id],
//             (err, rows, fields) => {
//               console.log("Success");
//               res.json(rows);
//             }
//           );
//         }
//       }
//     );
//   });
  

module.exports = app