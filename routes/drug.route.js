const express = require("express");
const getConnection = require("../db");
const app = express.Router();
const connection = getConnection();

app.get("/", (req, res, next) => {
  connection.query(
    "SELECT *, drug.drug_name as id FROM drug",
    (err, rows, fields) => {
      if (err)
        next(err)
      console.log("Thanh cong");
      console.log(res);
      res.header("Access-Control-Expose-Headers", "Content-Range");
      res.header("Content-Range", "bytes : 0-9/*");
      res.json(rows);
    }
  );
});


app.get("/symptom", (req, res, next) => {
  connection.query(
    `SELECT DISTINCT clinical_trial.drug_name, result.id_side_effect, side_effect.symptom
    FROM ((clinical_trial
    INNER JOIN result ON clinical_trial.id_clinical_trial = result.id_clinical_trail)
    INNER JOIN side_effect ON result.id_side_effect = side_effect.id_side_effect)`,
    (err, rows, fields) => {
      if (err)
        next(err)
      if (!err) {
        console.log("rows", rows);
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-15/*");
        res.status(200).json(rows);
      } else {
        res.status(400).send(err);
      }
    }
  );
});

module.exports = app;
