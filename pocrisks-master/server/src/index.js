import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getRisksFromDb } from "./repositories/Risk.repository"
import { saveRisksToDb } from "./Risks/SaveRisk"
import { signin } from "./Users/Models/AuthUser"


let PORT = 8088;
var app = express();

app.use(bodyParser.json());
app.use(cors());

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

