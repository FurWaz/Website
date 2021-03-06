import express from "express";
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

fs.writeFileSync("pid.txt", process.pid.toString());

const app = express();
app.listen(8080, () => {
    console.log("Server started on port 8080");
});

app.get("/api/*", (req, res) => {
    res.send("API is not implemented (path=" + req.path + ")");
});

app.get("/*", (req, res) => {
    let url = req.path == "/" ? "/index.html" : req.path;
    res.sendFile(path.resolve()+"/web"+url);
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