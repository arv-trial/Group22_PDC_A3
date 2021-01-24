const express = require("express");
const getConnection = require("../db");
const app = express.Router();
const connection = getConnection();

app.get("/", (req, res) => {
  connection.query(
    "SELECT *, clinical_trial.id_clinical_trial as id FROM clinical_trial",
    (err, rows, fields) => {
      console.log("Thanh cong");

      res.header("Access-Control-Expose-Headers", "Content-Range");
      res.header("Content-Range", "bytes : 0-9/*");

      res.json(rows);
    }
  );
});

app.get("/:id/clinical-trial", (req, res) => {
  const id = req.params["id"];
  connection.query(
    `SELECT *, patient.insurance_id as id FROM patient, clinical_trial WHERE patient.insurance_id =  AND patient.insurance_id = clinical_trial.insurance_id`,
    [id],
    (err, rows, fields) => {
      console.log("Thanh cong");

      res.header("Access-Control-Expose-Headers", "Content-Range");
      res.header("Content-Range", "bytes : 0-9/*");

      res.json(rows);
    }
  );
});

app.delete("/:id/clinical_trial", (req, res) => {
  const id = req.params["id"];
  console.log("id", id);
  // const query = `DELETE FROM patient WHERE insurance_id =  ${id} `
  connection.query(
    "DELETE FROM result WHERE id_clinical_trail = ?",
    [id],
    (err, rows, fields) => {
      console.log("rows", rows);
      if (!err) {
        connection.query(
          "DELETE FROM clinical_trial WHERE id_clinical_trail = ?",
          [id],
          (err, rows, fields) => {
            console.log("Success");

            res.header("Access-Control-Expose-Headers", "Content-Range");
            res.header("Content-Range", "bytes : 0-9/*");

            res.json(rows);
          }
        );
      }
      res.status(400).jsend(err);
    }
  );
});

app.get("/resistant", (req, res) => {
  connection.query(
    `SELECT COUNT(*) as value, 
    CASE WHEN (after_6_month-cd4_init_record) < 50 
    THEN "resistantPatient" ELSE "nonResistantPatient" END AS result
    FROM clinical_trial
    GROUP BY result`,
    (err, rows, fields) => {
      if (!err) {
        const result = rows.reduce((accumulator, currentValue) => {
          accumulator[currentValue.result] = currentValue.value;
          return { ...accumulator };
        }, {});

        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");

        return res.status(200).json(result);
      }

      return res.status(400).send(err);
    }
  );
});

app.get("/viral_load", (req, res) => {
  connection.query(
    `SELECT undetectable as status FROM clinical_trial `,
    (err, rows, fields) => {
      if (!err) {
        console.log("rows", rows);
        let result = rows.reduce(
          (accumulator, currentValue) => {
            currentValue.status == "true"
              ? (accumulator["undetectable"] += 1)
              : (accumulator["detectable"] += 1);
            return accumulator;
          },
          {
            detectable: 0,
            undetectable: 0,
          }
        );
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        return res.status(200).json(result);
      }

      return res.status(400).send(err);
    }
  );
});

// Update
app.put("/:id", (req, res) => {
  const id = req.params["id"];
  console.log("id", id);
  const body = req.body;
  console.log("body", body);
  console.log("body", body);

  connection.query(
    "UPDATE clinical_trial SET ? WHERE id_clinical_trial = ?",
    [body, id],
    (err, rows, fields) => {
      if (!err) {
        console.log("rows", rows);

        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        return res.status(200).json(rows);
      } else {
        return res.status(400).send(err);
      }
    }
  );
  // console.log("Trying to create a new user...")
  // console.log("How do u get the data?")
  // res.end()
});

module.exports = app;
