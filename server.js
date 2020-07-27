const numCPUs = require("os").cpus().length;
const compression = require("compression");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const express = require("express");
const https = require("https");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const config = require('./config');

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) {
        return false
    }
    return compression.filter(req, res);
};

app.use(compression());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(compression({
    filter: shouldCompress,
    level: 7,
}));

const options = process.env.NODE_ENV === "production" ? {
    key: fs.readFileSync("certs/key.pem"),
    cert: fs.readFileSync("certs/cert.pem")
} : {};

app.use(bodyParser.json({ limit: "10mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());

let AuthenticationController = require("./Controllers/AuthenticationController")();
app.use("/auth", AuthenticationController);

let CompanyController = require("./Controllers/CompanyController")();
app.use("/company", CompanyController);

app.get("/", function (req, res) {
    res.json({ "Message": "Welcome to Reserbox API" });
});

try {
    if (cluster.isMaster) {
        console.log("Master " + process.pid + " is running");

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log("worker " + worker.process.pid + " died");
        });

    }
    else {
        console.log("Worker " + process.pid + " started");

        app.get("/cluster", (req, res) => {
            let worker = cluster.worker.id;
            res.send("Running on worker with id ==> " + worker);
        });

        createServer();
    }
}
catch (error) {
    console.log(config.console.RedColor, error);
}

function createServer() {
    if (process.env.NODE_ENV === "production") {
        https.createServer(options, app).listen(process.env.PORT, app.get('host'), () => {
            printServerInfo();
        });
    }
    else {
        http.createServer(app).listen(process.env.PORT, app.get("host"), () => {
            printServerInfo();
        });
    }
}

function printServerInfo() {
    var dateTime = new Date();
    var message = `Server runnning on Port:- ${process.env.PORT} Started at :- ${dateTime}`;
    console.log(config.console.greenColor, message);
}