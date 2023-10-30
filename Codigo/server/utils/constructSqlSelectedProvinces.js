const constructSqlSelectedProvinces = (params) => {
  const parametros = [];
  let sql = `SELECT * FROM city where 1=1`;

  params.map((e, i) => {
    if (i === 0) {
      sql += ` AND province_id = ${e.value}`;
      parametros.push(e.value);
    } else {
      sql += ` OR province_id = ${e.value}`;
      parametros.push(e.value);
    }
  });

  return { sql, parametros };
};

module.exports = { constructSqlSelectedProvinces };
