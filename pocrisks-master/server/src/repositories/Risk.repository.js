import { client } from "../db/connect";

export const getRisksFromDb = async () => {
  const rs = await client.query(
    "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json))  FROM " +
      "(SELECT * FROM public.risque as r LEFT JOIN public.images as i ON r.image_id = i.id "+
      "join public.type_risque as tr on r.type_id = tr.id) as t;"
  );
  return rs.rows[0].json_build_object;
};

