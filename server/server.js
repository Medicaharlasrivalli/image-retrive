const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saibaba@123",
  database: "Valli",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
app.post("/upload", upload.single("image"), (req, res) => {
    const {id}=req.query;
  const image = req.file.filename;
  const sql = "UPDATE users SET image=? where id=?";
  db.query(sql, [image,id], (err, result) => {
    console.log(err);
    if (err) return res.json({ Message: "Error" });
    else return res.json({ Status: "Success" });
  });
});
app.get("/", (req, res) => {
    const {id}=req.query;
  const sql = "select * from users where id=?";
  db.query(sql, [id],(err, result) => {
    if (err) return res.json({ Message: "Error" });
    else {
        console.log(result[0].image)
        return res.send(result[0].image)
    }
  });
});
app.listen(8081, () => {
  console.log("Server is running on 8081....");
});
