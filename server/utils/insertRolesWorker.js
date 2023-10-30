const connection = require("../config/database");

//Función que realiza de forma automática la elección de roles de usuario Profesional
const insertRolesWorker = (roles, user_id, res) => {
  let sql1 = `DELETE from user_worker_job_role WHERE user_id = ${user_id}`;

  connection.query(sql1, (err1, result1) => {
    if (err1) {
      res.status(400).json(err1);
    } else {
      if (roles) {
        roles.forEach((e) => {
          let sql2 = `INSERT INTO user_worker_job_role (role_id, user_id) VALUES (${e.value}, ${user_id})`;

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

module.exports = insertRolesWorker;
