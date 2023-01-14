import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mern'
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello");
})

app.get("/cars", (req, res) => {
    const sql = "SELECT * FROM cars";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/cars", (req, res) => {
    const sql = "INSERT INTO cars (`title`,`description`,`price`,`image`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Inserted successfully");
    });
})

app.delete("/cars/:id", (req, res) => {
    const carId = req.params.id;
    const sql = "DELETE FROM cars WHERE id = ?";
    db.query(sql, [carId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Car added successfully");
    })
})

app.put("/cars/:id", (req, res) => {
    const carId = req.params.id;
    const sql = "UPDATE cars SET `title` = ?, `description` = ?, `price` = ?, `image` = ? WHERE id = ? ";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image
    ];
    db.query(sql, [...values, carId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Car updated successfully");
    })
})

app.listen(5000, () => {
    console.log('connected to backend');
})
