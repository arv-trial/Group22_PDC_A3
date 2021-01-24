const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res, next) => {
    connection.query('SELECT *, company.company_name as id FROM company', (err, rows, fields) => {
      if(err) next(err)
        console.log('Thanh cong')
        // res.header("Access-Control-Expose-Headers", "Content-Range");
        // res.header("Content-Range", "bytes : 0-9/*");
        res.json(rows)
    })
})

app.put("/:company", function (req, res, next) {
    let id = req.params["company"];
    let body = req.body
    let description = req.params.description;
    let base = req.params.base;
    connection.query(
      "UPDATE `company` SET ? WHERE `company_name` = ?",
      [body,id],
      function (error, results, fields) {
        if(error) next(error)
        console.log(results);
        
        // res.header("Access-Control-Expose-Headers", "Content-Range");
        // res.header("Content-Range", "bytes : 0-9/*");

        res.end(JSON.stringify(results));
      }
    );
  });
  
  // FIXME: 
  app.post("/", (req, res, next) => {
    console.log("Trying to create a new user...");
    console.log("How do we get the data?");
  
    let body = req.body;
  
    console.log("req.body", req.body);
  
    const queryString = "INSERT INTO `company` SET ?";
    connection.query(
      queryString,
      [body],
      (err, result, fields) => {
        if(err) next(err)
        // console.log('Insert a new user with id: ', result.insertedId);
        console.log("result", result);

        // res.header("Access-Control-Expose-Headers", "Content-Range");
        // res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        // res.header("Content-Range", "bytes : 0-9/*");
        
        res.status(200).json(result);
        // res.end()
      }
    );
  });
  

  

module.exports = app