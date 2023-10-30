const constructSqlAllOffers = (params) => {
  let sql =
    "select j_o.*, r.role_name, r.role_id, c.*, p.* from job_offer j_o, role r, city c, province p where j_o.role_id = r.role_id and j_o.city_id = c.city_id and c.province_id = j_o.province_id and j_o.province_id = p.province_id ";

  const { role, city_id, province_id } = params;
  const parametros = [];

  if (role) {
    sql += ` AND r.role_id = ${role}`;
    parametros.push(role);
  }

  if (city_id) {
    sql += ` AND c.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND p.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql += " and j_o.is_deleted = 0 and j_o.is_published = 1";

  return { sql, parametros };
};

module.exports = {
  constructSqlAllOffers,
};
