import { client } from "../db/connect";

export const saveRisksToDb = async (description , lt , lg, type ) => {
  const rs = await client.query("INSERT INTO risque ( description , geom , date, type_id ) VALUES ( $1, $2 , $3, $4)" , [ description , ' POINT(' +lg.toFixed(3) +' ' + lt.toFixed(3) +' )' , new Date(), type ]);
  return rs.rowCount;
};

export const getAllTypes = async () => {
  const rs = await client.query("select * from type_risque");
  return rs.rows;
};
