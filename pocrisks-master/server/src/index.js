import express from "express";
import { client } from "./db/connect";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet"
import morgan from "morgan"
import { getRisksFromDb } from "./repositories/Risk.repository"
import path from 'path';
import { getAllTypes, saveRisksToDb, saveImageToDb } from "./Risks/SaveRisk"
import { signin } from "./Users/Models/AuthUser"
import { deleteTableData, getTableData, postTableData, putTableData } from "./controllers";
import  multer from "multer";

let storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    let name = 'Risk-'+Date.now()+"."+file.originalname.split(".")[1];
    cb(null, name);

  }
})
let upload = multer({
  storage: storage
}).single("image");

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

app.post("/saveRisk", upload, async (req, res) => {
  const {risk: description, lt, lg, type, username} = req.body;
  //instert image in the db
  console.log("file ", req.file)
  let insertedImage = null;
  if(req.file)
    insertedImage = await saveImageToDb(req.file.filename)
  //insert risk
  
  const afftectedRows = await saveRisksToDb(description ,parseFloat(lt) ,parseFloat(lg), type, username, insertedImage);
  if(afftectedRows === 1)
    return res.json({
      success: true,
      message: "Risk added!"
    })
  return res.json({
      success: false,
      message: "Error while adding a risk!"
    })
  
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

// select risk types
app.get("/types",async (req, res) => {

  const result = await getAllTypes();

  if(result && result.length > 0)
      return res.json({
        success: true,
        types: result
      });

  return res.json({
    success: false,
    message: "Error fetching types"
  })
});

app.use(express.static('uploads'));

app.listen(PORT, () => {
  console.log("Listening to port : ", PORT);
});

