const connection = require("../config/database");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/validateEmail");
const insertLocationWorker = require("../utils/insertLocationWorker");
const insertRolesWorker = require("../utils/insertRolesWorker");
const {
  constructSqlRol,
  constructSqlSinRol,
  constructSqlProvinceCity,
  constructSqlLocationRol,
} = require("../utils/constructSqlWorker");

class WorkerController {
  getCountWorker = (req, res) => {
    let sql =
      "SELECT count(user_id) FROM user WHERE type = 1 AND is_deleted = 0";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getOneWorker = (req, res) => {
    const { worker_id } = req.params;

    let sql1 = `SELECT u.*, w.*, cy.city, p.province FROM user u
    LEFT JOIN worker w on u.user_id = w.user_id
      left join city cy on u.city_id = cy.city_id and u.province_id = cy.province_id
      left join province p on u.province_id = p.province_id
      where u.user_id = ${worker_id} and u.is_deleted = 0 and u.type = 1;`;

    connection.query(sql1, (err1, result) => {
      if (err1) {
        res.status(400).json(err1);
      } else {
        let sql2 = `SELECT m_uw.*, c.city from  mobility_user_worker m_uw, city c  where c.city_id = m_uw.city_id and c.province_id = m_uw.province_id and m_uw.user_id = ${worker_id}`;

        connection.query(sql2, (err2, result2) => {
          let movilityTemp = result2.map((e) => ({
            value: `${e.city_id},${e.province_id}`,
            label: `${e.city}`,
          }));

          result = { ...result[0], movility: movilityTemp };

          err2;
          if (err2) {
            res.status(400).json(err2);
          } else {
            let sql3 = `SELECT uw_jr.*, r.role_name from  user_worker_job_role uw_jr, role r  where r.role_id = uw_jr.role_id and  uw_jr.user_id = ${worker_id}`;
            connection.query(sql3, (err3, result3) => {
              let rolesTemp = result3.map((e) => ({
                value: `${e.role_id}`,
                label: `${e.role_name}`,
              }));
              result = { ...result, spected_roles: rolesTemp };
              res.status(200).json(result);
            });
          }
        });
      }
    });
  };

  registerWorker = (req, res) => {
    const {
      conditions,
      name,
      last_name,
      phone_number,
      dni_cif,
      email,
      password,
    } = req.body;

    //Validación si usuario ha leido y aceptado las condiciones de uso.
    if (conditions) {
      //Validación para que no entren campos vacíos.
      if (
        name === "" ||
        last_name === "" ||
        phone_number === "" ||
        dni_cif === "" ||
        email === "" ||
        password === ""
      ) {
        res.status(400).json("¡No puede haber datos vacios!");
      }
      //Validación para que no superen los caracteres máximos.
      else if (
        name.length > 100 ||
        last_name.length > 100 ||
        phone_number.length > 20 ||
        dni_cif.length > 9 ||
        email.length > 50 ||
        password.length > 8
      ) {
        res.status(400).json("¡Datos demasiado largos!");
      }
      //Validación para que el usuario no meta ningún email incorrecto.
      else if (validateEmail(email) === false) {
        res.status(400).json("¡Email incorrecto!");
      } else if (dni_cif.length !== 9) {
        res.status(400).json("¡DNI/CIF introducido incorrectamente!");
      } else if (phone_number.length < 9) {
        res.status(400).json("¡Teléfono introducido incorrectamente!");
      } else {
        let saltRounds = 8;

        bcrypt.genSalt(saltRounds, function (err, saltRounds) {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            let sql1 = `INSERT INTO user (name, last_name, phone_number, dni_cif, email, password) VALUES ("${name}","${last_name}","${phone_number}","${dni_cif}","${email}","${hash}")`;

            connection.query(sql1, (err1, result1) => {
              if (err1) {
                res.status(400).json(err1);
              } else {
                let sql2 = `INSERT INTO worker (user_id) VALUES ("${result1.insertId}")`;

                connection.query(sql2, (err2, result2) => {
                  err2
                    ? res.status(400).json(err2)
                    : res.status(200).json({ result1, result2 });
                });
              }
            });
          });
        });
      }
    } else {
      res.status(400).json("Tienes que aceptar las condiciones de uso");
    }
  };

  editWorker = (req, res) => {
    const {
      name,
      last_name,
      dni_cif,
      email,
      phone_number,
      address,
      province_id,
      city_id,
      zip_code,
      worker_bio,
      movility,
      spected_roles,
    } = JSON.parse(req.body.register);
    const { worker_id } = req.params;

    let img = null;
    let complete = 0;

    let sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}" WHERE user_id = ${worker_id}`;

    let sql2 = `UPDATE worker SET worker_bio="${worker_bio}" WHERE user_id = ${worker_id}`;

    if (req.file != undefined) {
      img = req.file.filename;

      //Validación para que la imagen no supere los caracteres máximos.
      if (img.length > 100) {
        res.status(400).json("¡Nombre imagen demasiado largo!");
      } else {
        sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}", img="${img}" WHERE user_id = ${worker_id}`;
      }
    }

    //Validación para que no entren campos vacíos.
    if (
      name === "" ||
      last_name === "" ||
      phone_number === "" ||
      dni_cif === "" ||
      email === "" ||
      address === "" ||
      province_id === null ||
      city_id === null
    ) {
      res.status(400).json("¡No puede haber datos vacios!");
    }
    //Validación para que no superen los caracteres máximos.
    else if (
      name.length > 100 ||
      last_name.length > 100 ||
      phone_number.length > 20 ||
      dni_cif.length > 9 ||
      email.length > 50 ||
      address.length > 120 ||
      zip_code.length > 5 ||
      worker_bio.length > 800
    ) {
      res.status(400).json("¡Datos demasiado largos!");
    }
    //Validación para que el usuario no meta ningún email incorrecto.
    else if (validateEmail(email) === false) {
      return res.status(400).json("¡Email incorrecto!");
    } else if (zip_code.length < 5) {
      return res.status(400).json("¡Codigo postal incorrecto!");
    } else if (dni_cif.length !== 9) {
      return res.status(400).json("¡DNI/NIE incorrecto!");
    } else if (phone_number.length < 9) {
      return res.status(400).json("¡Teléfono introducido incorrectamente!");
    } else {
      if (movility.length > 0 && spected_roles.length > 0) {
        if (req.file != undefined) {
          complete = 1;
          sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}", img="${img}", complete_profile = true WHERE user_id = ${worker_id}`;
        } else {
          complete = 1;
          sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}", complete_profile = true WHERE user_id = ${worker_id}`;
        }
      } else {
        if (req.file != undefined) {
          sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}", img="${img}" WHERE user_id = ${worker_id}`;
        } else {
          sql1 = `UPDATE user SET name="${name}", last_name="${last_name}", phone_number="${phone_number}", dni_cif="${dni_cif}", email="${email}", address="${address}", province_id=${province_id}, city_id=${city_id}, zip_code="${zip_code}" WHERE user_id = ${worker_id}`;
        }
      }

      connection.query(sql1, (err1, result1) => {
        err1
          ? res.status(400).json(err1)
          : connection.query(sql2, (err2, result2) => {
              err2
                ? res.status(400).json(err2)
                : res.status(200).json({ result1, result2, img, complete });
            });
      });
    }
  };

  otherInfoWorker = (req, res) => {
    const { skills, education, job_experience } = req.body;
    const { worker_id } = req.params;

    let sql = `UPDATE worker SET skills="${skills}", education="${education}", job_experience="${job_experience}" WHERE user_id = ${worker_id}`;

    if (
      skills.length > 800 ||
      education.length > 800 ||
      job_experience.length > 800
    ) {
      res.status(400).json("¡Texto demasiado largos!");
    } else {
      connection.query(sql, (err, result) => {
        err ? res.status(400).json(err) : res.status(200).json(result);
      });
    }
  };

  cvInfoWorker = (req, res) => {
    const { worker_id } = req.params;
    let docCv = null;

    if (req.file != undefined) {
      docCv = req.file.filename;

      //Validación para que la imagen no supere los caracteres máximos.
      if (docCv > 100) {
        res.status(400).json("¡Nombre imagen demasiado largo!");
      } else {
        let sql = `UPDATE worker SET cv_file="${docCv}" WHERE user_id = ${worker_id}`;

        connection.query(sql, (err, result) => {
          err
            ? res.status(400).json(err)
            : res.status(200).json({ result, docCv });
        });
      }
    }
  };

  preferInfoWorker = (req, res) => {
    const { worker_id } = req.params;
    const {
      spected_salary,
      name,
      last_name,
      email,
      address,
      province_id,
      city_id,
      phone_number,
      dni_cif,
    } = req.body.editImput;
    let { selectedCities, selectedRoles } = req.body;

    let sql1 = `UPDATE worker SET spected_salary=${spected_salary} WHERE user_id = ${worker_id}`;
    let complete = 0;

    if (
      spected_salary == "" ||
      selectedCities.length == 0 ||
      selectedRoles.length == 0
    ) {
      return res.status(400).json("¡No puede haber datos vacios!");
    } else {
      connection.query(sql1, (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          if (selectedCities.length === 0 || selectedRoles.length === 0) {
            res.status(400).json("¡No puede haber datos vacios!");
          } else {
            insertLocationWorker(selectedCities, worker_id, res);
            insertRolesWorker(selectedRoles, worker_id, res);
          }
          if (
            name &&
            last_name &&
            email &&
            address &&
            province_id &&
            city_id &&
            phone_number &&
            dni_cif
          ) {
            let sql2 = `UPDATE user SET complete_profile = 1 WHERE user_id = ${worker_id}`;
            complete = 1;

            connection.query(sql2, (err2, result2) => {
              err2
                ? res.status(400).json(err2)
                : res.status(200).json({ result, result2, complete });
            });
          } else {
            res.status(200).json(result);
          }
        }
      });
    }
  };

  deleteWorker = (req, res) => {
    const { worker_id } = req.params;
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${worker_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  allWorkers = (req, res) => {
    const { userType } = req.body;

    let sql =
      "SELECT u.*, w.* FROM user u LEFT JOIN worker w on u.user_id = w.user_id where u.is_deleted = 0 and w.open_work = 1 and u.type = 1 ORDER BY w.user_id DESC";

    if (userType === 0) {
      sql =
        "SELECT u.*, w.* FROM user u LEFT JOIN worker w on u.user_id = w.user_id where u.is_deleted = 0 and u.type = 1 ORDER BY w.user_id DESC";
    }

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  filters = (req, res) => {
    const { role, city_id, province_id } = req.body;
    let sql1;
    let parametros1;

    if (
      (role && city_id) ||
      (role && province_id) ||
      (role && province_id && city_id)
    ) {
      const { sql, parametros } = constructSqlLocationRol(req.body);
      sql1 = sql;
      parametros1 = parametros;
    } else if (role) {
      const { sql, parametros } = constructSqlRol(req.body);
      sql1 = sql;
      parametros1 = parametros;
    } else if (city_id || province_id) {
      const { sql, parametros } = constructSqlProvinceCity(req.body);
      sql1 = sql;
      parametros1 = parametros;
    } else {
      const { sql, parametros } = constructSqlSinRol(req.body);
      sql1 = sql;
      parametros1 = parametros;
    }

    connection.query(sql1, parametros1, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  workerApplyOffer = (req, res) => {
    const { worker_id } = req.params;
    const { job_offer_id } = req.body;

    let sql = `INSERT INTO user_worker_job_offer (user_id, job_offer_id) VALUES (${worker_id}, ${job_offer_id})`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  allWorkerApplierOffer = (req, res) => {
    const { offer_id } = req.params;
    let sql = `select u.*, w.worker_bio from user u, worker w, user_worker_job_offer uw_jo where u.user_id = w.user_id and u.user_id = uw_jo.user_id and uw_jo.job_offer_id = ${offer_id} ORDER BY uw_jo.apply_date DESC`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  deleteAppliersOffer = (req, res) => {
    const { offer_id } = req.body;

    let sql = `DELETE FROM user_worker_job_offer WHERE job_offer_id = ${offer_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  allApplierOneOffer = (req, res) => {
    const { offer_id } = req.params;
    let sql = `select * from user_worker_job_offer where job_offer_id = ${offer_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  changeOption = (req, res) => {
    const { worker_id } = req.params;
    const { open_work } = req.body;

    let sql = `UPDATE worker SET open_work = ${open_work} WHERE user_id = ${worker_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  workerOffers = (req, res) => {
    const { worker_id } = req.params;

    let sql = `SELECT j_o.*, uw_jo.*, r.role_id, r.role_name, c.*, p.* FROM job_offer j_o, user_worker_job_offer uw_jo, role r, city c, province p WHERE uw_jo.job_offer_id = j_o.job_offer_id and j_o.role_id = r.role_id and j_o.city_id = c.city_id and j_o.province_id = p.province_id and p.province_id = c.province_id and uw_jo.user_id = ${worker_id} ORDER BY uw_jo.apply_date DESC;`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  workerLimit = (req, res) => {
    let sql = `SELECT u.*, w.* FROM user u LEFT JOIN worker w on u.user_id = w.user_id where u.type = 1 AND is_deleted = 0 ORDER BY u.user_id DESC LIMIT 6;`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
}

module.exports = new WorkerController();
