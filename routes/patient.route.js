const express = require("express");
const getConnection = require("../db");
const app = express.Router();
const connection = getConnection();

app.get("/:id", (req, res) => {
  console.log("Fetching patient with id: " + req.params.id);
  var id = "iid" + req.params.id;
  connection.query(
    "SELECT * FROM patient WHERE insurance_id = ? ",
    [id],
    (err, rows, fields) => {
      if (rows.length) {

        const result = {
          ...rows[0],
          id: parseInt(rows[0].insurance_id.slice(3)),
        };
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        res.json(result);
      }
      res.status(404).json('Item not found')
    }
  );
});

app.put("/:edit_id", function (req, res) {
  let insurance_id = "iid" + req.params["edit_id"];
  const { id, ...rest } = req.body

  connection.query(
    "UPDATE `patient` SET ? WHERE insurance_id = ?", [rest, insurance_id],
    function (error, results, fields) {
      if (error) { throw error }
      else {
        // let total = results.length
        // console.log(total)
        // console.log(results);
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        res.header('Access-Control-Expose-Headers', 'X-Total-Count')
        // res.set("X-total-count", total)
        // res.end(JSON.stringify(results))

        res.status(200).json({ data: req.body })

      };
    }
  );
});

app.post("/", (req, res) => {
  console.log("Trying to create a new user...");
  console.log("How do we get the data?");

  const patientName = req.body.patient_name;
  const insurance_id = req.body.insurance_id;

  const body = {
    ...req.body,
    insurance_id: parseInt(req.body.id.slice(3)),
  };

  console.log("req.body", req.body);

  const queryString = "INSERT INTO `patient` VALUES (?)";
  connection.query(
    queryString,
    [Object.values(req.body)],
    (err, result, fields) => {
      if (err) {
        console.log("Failed to insert new user:" + err);
        res.sendStatus(500);
        return;
      }

      // console.log('Insert a new user with id: ', result.insertedId);
      console.log("result", result);
      res.header("Access-Control-Expose-Headers", "Content-Range");
      res.header("Content-Range", "bytes : 0-9/*");
      res.status(200).json(result);
      // res.end()
    }
  );
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM patient", (err, rows, fields) => {
    console.log("Thanh cong");
    console.log("rows", rows);
    const result = rows.map((row) => ({
      ...row,
      id: parseInt(row.insurance_id.slice(3)),
    }));
    console.log("result", result);

    res.header("Access-Control-Expose-Headers", "Content-Range");
    res.header("Content-Range", "bytes : 0-9/*");

    res.json(result);
  });
});

app.delete("/:delete_id", (req, res) => {
  const id = "iid" + req.params["delete_id"];
  console.log("id", id);
  connection.query(
    `DELETE result
    FROM result 
    INNER JOIN clinical_trial 
    ON result.id_clinical_trail = clinical_trial.id_clinical_trial 
    WHERE clinical_trial.insurance_id = ?`,
    [id],
    (err, rows, fields) => {
      connection.query(
        "DELETE FROM clinical_trial WHERE insurance_id =  ?",
        [id],
        (err, rows, fields) => {
          console.log("rows", rows);
          if (!err) {
            connection.query(
              "DELETE FROM patient WHERE insurance_id =  ?",
              [id],
              (err, rows, fields) => {
                console.log("Success");

                res.header("Access-Control-Expose-Headers", "Content-Range");
                res.header("Content-Range", "bytes : 0-9/*");

                res.json(rows);
              }
            );
          }
        }
      );
    }
  );
});

module.exports = app;
