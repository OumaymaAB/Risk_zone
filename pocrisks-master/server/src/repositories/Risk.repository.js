import { client } from "../db/connect";

export const getRisksFromDb = async () => {
  const rs = await client.query(
    "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))  FROM "+
    " (SELECT * FROM public.risque as r, public.type_risque as tr where tr.id = r.type_id) as t;"
  );
  return rs.rows[0].json_build_object;
};
