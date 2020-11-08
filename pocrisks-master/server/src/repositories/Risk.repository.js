import { client } from "../db/connect";

export const getRisksFromDb = async () => {
  const rs = await client.query(
    "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))  FROM (SELECT * FROM public.risk) as t;"
  );
  return rs.rows[0].json_build_object;
};
