import express from "express";
import { client } from "./db/connect";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan"
import { getRisksFromDb } from "./repositories/Risk.repository"

import { saveRisksToDb } from "./Risks/SaveRisk"
import { signin } from "./Users/Models/AuthUser"
import { deleteTableData, getTableData, postTableData, putTableData } from "./controllers";


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
app.get('/crud', (req, res) => getTableData(req, res, db))
app.post('/crud', (req, res) => postTableData(req, res, db))
app.put('/crud', (req, res) => putTableData(req, res, db))
app.delete('/crud', (req, res) => deleteTableData(req, res, db))






app.get("/",async (req, res) => {
  const result = await getRisksFromDb();
  res.send(result);
});

app.post("/saveRisk", async (req, res) => {
  console.log(req.body)
  const result = await saveRisksToDb(req.body.description , req.body.lt , req.body.lg);
});

app.post("/signin" , async (req, res , next) => {
  try{

    //req.body.username="ihssane"
    //req.body.password ="ihssane"
    console.log(res.body)
    const result = await signin(req ,res)
    
    console.log("res : ",result)

    res.send(result);
    
  }catch(err)
  {
    //console.log(err)
    next(err)
    //return res.send(res.status(403))
  }
});


app.listen(PORT, () => {
  console.log("Listening to port : ", PORT);
});

