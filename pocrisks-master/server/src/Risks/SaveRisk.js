import { client } from "../db/connect";

export const saveRisksToDb = async (description, lt, lg, type, image_id) => {
  const rs = await client.query(
    "INSERT INTO risque ( description , geom , date, type_id, image_id ) VALUES ( $1, $2 , $3, $4, $5)",
    [
      description,
      " POINT(" + lg.toFixed(3) + " " + lt.toFixed(3) + " )",
      new Date(),
      type,
      image_id
    ]
  );
  return rs.rowCount;
};

export const saveImageToDb = async (imageName) => {
  const rs = await client.query("INSERT INTO images (name) VALUES ($1)", [
    imageName,
  ]);
  if (rs.rowCount) {
    const seq = await client.query(
      "SELECT currval(pg_get_serial_sequence('images','id'));"
    );

    return seq.rows[0].currval;
  }
  return null;
};

export const getAllTypes = async () => {
  const rs = await client.query("select * from type_risque");
  return rs.rows;
};
