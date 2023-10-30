const constructSqlSector = (params) => {
  let sql =
    "SELECT u.*, c.*, sc.* FROM user u LEFT JOIN company c on u.user_id = c.user_id LEFT JOIN sector_user_company sc on c.user_id = sc.user_id WHERE 1=1";

  const { sectors, city_id, province_id, is_validated } = params;
  const parametros = [];

  if (sectors) {
    sql += ` AND sc.sector_id = ${sectors}`;
    parametros.push(sectors);
  }

  if (is_validated) {
    sql += ` AND c.is_validated = ${is_validated}`;
    parametros.push(is_validated);
  }

  if (city_id) {
    sql += ` AND u.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND u.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql += " AND u.type = 2 AND u.is_deleted = 0";

  return { sql, parametros };
};

const constructSqlSinSector = (params) => {
  let sql = "SELECT u.*, c.* FROM user u, company c WHERE 1=1";

  const { city_id, province_id, is_validated } = params;
  const parametros = [];

  if (is_validated) {
    sql += ` AND c.is_validated = ${is_validated}`;
    parametros.push(is_validated);
  }

  if (city_id) {
    sql += ` AND u.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND u.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql += " AND u.user_id = c.user_id AND u.type = 2 AND u.is_deleted = 0";

  return { sql, parametros };
};

module.exports = {
  constructSqlSector,
  constructSqlSinSector,
};
