const constructSqlRol = (params) => {
  let sql =
    "SELECT u.*, w.*, wj.* FROM user u LEFT JOIN worker w ON u.user_id = w.user_id LEFT JOIN user_worker_job_role wj ON w.user_id = wj.user_id WHERE 1=1";

  const { name, last_name, role, city_id, province_id } = params;
  const parametros = [];

  if (name) {
    sql += ` AND u.name like "%${name}%"`;
    parametros.push(name);
  }

  if (last_name) {
    sql += ` AND u.last_name like "%${last_name}%"`;
    parametros.push(last_name);
  }

  if (role) {
    sql += ` AND wj.role_id = ${role}`;
    parametros.push(role);
  }

  if (city_id) {
    sql += ` AND u.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND u.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql += " AND u.is_deleted = 0 AND w.open_work = 1 AND u.type = 1";

  return { sql, parametros };
};

const constructSqlSinRol = (params) => {
  let sql = "SELECT u.*, w.* FROM user u, worker w WHERE 1=1";

  const { name, last_name, role, city_id, province_id } = params;
  const parametros = [];

  if (name) {
    sql += ` AND u.name like "%${name}%"`;
    parametros.push(name);
  }

  if (last_name) {
    sql += ` AND u.last_name like "%${last_name}%"`;
    parametros.push(last_name);
  }

  if (city_id) {
    sql += ` AND u.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND u.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql +=
    " AND u.user_id = w.user_id AND u.is_deleted = 0 AND w.open_work = 1 AND u.type = 1";

  return { sql, parametros };
};

const constructSqlProvinceCity = (params) => {
  let sql =
    "SELECT u.*, w.*, m.* FROM user u LEFT JOIN worker w ON u.user_id = w.user_id LEFT JOIN mobility_user_worker m ON u.user_id = m.user_id WHERE 1=1";

  const { name, last_name, role, city_id, province_id } = params;
  const parametros = [];

  if (name) {
    sql += ` AND u.name like "%${name}%"`;
    parametros.push(name);
  }

  if (last_name) {
    sql += ` AND u.last_name like "%${last_name}%"`;
    parametros.push(last_name);
  }

  if (city_id) {
    sql += ` AND m.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND m.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  sql += " AND u.is_deleted = 0 AND w.open_work = 1 AND u.type = 1";

  return { sql, parametros };
};

const constructSqlLocationRol = (params) => {
  let sql =
    "SELECT u.*, w.*, m.*, wj.* FROM user u LEFT JOIN worker w ON u.user_id = w.user_id LEFT JOIN mobility_user_worker m ON u.user_id = m.user_id LEFT JOIN user_worker_job_role wj ON w.user_id = wj.user_id WHERE 1=1";

  const { name, last_name, role, city_id, province_id } = params;
  const parametros = [];

  if (name) {
    sql += ` AND u.name like "%${name}%"`;
    parametros.push(name);
  }

  if (last_name) {
    sql += ` AND u.last_name like "%${last_name}%"`;
    parametros.push(last_name);
  }

  if (city_id) {
    sql += ` AND m.city_id = ${city_id}`;
    parametros.push(city_id);
  }

  if (province_id) {
    sql += ` AND m.province_id = ${province_id}`;
    parametros.push(province_id);
  }

  if (role) {
    sql += ` AND wj.role_id = ${role}`;
    parametros.push(role);
  }

  sql += " AND u.is_deleted = 0 AND w.open_work = 1 AND u.type = 1";

  return { sql, parametros };
};

module.exports = {
  constructSqlRol,
  constructSqlSinRol,
  constructSqlProvinceCity,
  constructSqlLocationRol,
};
