const connection = require("../config/database");

//Función que realiza de forma automática la elección de sectores de usuario Empresa
const insertSectorCompany = (sectors, user_id) => {
  let sql1 = `DELETE from sector_user_company WHERE user_id = ${user_id}`;

  connection.query(sql1, (err1, result1) => {
    if (err1) {
      throw err1;
    } else {
      sectors.forEach((sector) => {
        sql2 = `INSERT INTO sector_user_company (sector_id, user_id) VALUES (${sector}, ${user_id})`;

        connection.query(sql2, (err2, result2) => {
          if (err2) {
            throw err2;
          }
        });
      });
    }
  });

  return true;
};

module.exports = insertSectorCompany;
