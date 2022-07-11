import express from "express";
import { Sequelize } from "sequelize";

const app = express();
app.listen(8080, () => {
    console.log("Server started on port 8080");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err.toString());
});