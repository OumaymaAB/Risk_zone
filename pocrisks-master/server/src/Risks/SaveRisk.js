import { client } from "../db/connect";

export const saveRisksToDb = async (description , lt , lg ) => {
  const rs = await client.query("INSERT INTO risque ( descrip , geom , date ) VALUES ( $1, $2 , $3)" , [ description , ' POINT(' +lg.toFixed(3) +' ' + lt.toFixed(3) +' )' , new Date() ]);
};
