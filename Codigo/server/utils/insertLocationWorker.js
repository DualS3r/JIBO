const connection = require("../config/database");

//Función que realiza de forma automática la elección de localizaciones deseadas de usuario Profesional
const insertLocationWorker = (locations, user_id, res) => {
  let sql1 = `DELETE from mobility_user_worker WHERE user_id = ${user_id}`;

  connection.query(sql1, (err1, result1) => {
    if (err1) {
      res.status(400).json(err1);
    } else {
      if (locations) {
        locations.forEach((e) => {
          const locationsTemp = e.value.split(",");
          const province_id = locationsTemp[1];
          const city_id = locationsTemp[0];

          let sql2 = `INSERT INTO mobility_user_worker (city_id, province_id, user_id) VALUES (${city_id}, ${province_id}, ${user_id})`;

          connection.query(sql2, (err2, result2) => {
            if (err2) {
              res.status(400).json(err2);
            }
          });
        });
      }
    }
  });

  return true;
};

module.exports = insertLocationWorker;
