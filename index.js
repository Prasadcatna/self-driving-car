const express = require('express')
const app = express()

const port = 3003;
const host = '127.0.0.1';

var bodyParser = require("body-parser")

app.use(bodyParser.json());

const Sequelize = require("sequelize-cockroachdb")

var sequelize = new Sequelize({
    dialect: "postgres",
    username: "prasadcatna01_outloo",
    password: "vDqFVglF2NUvHZ-q5xE6xA",
    host: "close-duke-5647.8nk.cockroachlabs.cloud",
    port: 26257,
    dialectOptions: {
        ssl: {

        },
    },
    database: "defaultdb",
    logging: false,
});


const People = sequelize.define("people", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
    },
});

app.get('/list', (req, res) => {
    People.sync({
        force: false,
    })
    .then(function() {
        return People.findAll();
    })
    .then(function(people) {
        res.send(people);
    })
})

app.post('/add', function(req, res){
    People.sync({
        force: false,
    })
    .then(function() {
        return People.bulkCreate([
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
            },
        ])
    })
    .catch(function(err) {
        console.error("error:- ", err.message);
    });
    res.send("People created with Name:- " + req.body.name);
})

app.post('/delete', function(req, res){
    People.drop();
    res.send("Peoples table dropped!");
})

app.listen(port, host, () => {
    console.log(`Server started at ${host} port ${port}`);
})
