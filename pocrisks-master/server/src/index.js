import express from "express";
import { client } from "./db/connect";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan"
import { getRisksFromDb } from "./repositories/Risk.repository"
import { main } from "./controllers/"

let PORT = 8088;
var app = express();

app.use(bodyParser.json());// turns response into usable format
app.use(cors());  // allows/disallows cross-site communication
app.use(helmet());// creates headers that protect from attacks (security)
app.use(morgan('combined'));// logs requests


// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'RiskZone'
  }
});



// App Middleware
const whitelist = ['http://localhost:8088']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// App Routes - Auth
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))






app.get("/",async (req, res) => {
  const result = await getRisksFromDb();
  res.send(result);
});

app.listen(PORT, () => {
  console.log("Listening to port : ", PORT);
});
