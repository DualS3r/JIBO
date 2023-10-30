const connection = require("../config/database");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/validateEmail");
const insertSectorCompany = require("../utils/insertSectorCompany");
const {
  constructSqlSector,
  constructSqlSinSector,
} = require("../utils/constructSqlCompany");
const main = require("../utils/nodemailer");
require("dotenv").config();

class CompanyController {
  getCountCompany = (req, res) => {
    let sql =
      "SELECT count(user_id) FROM user WHERE type = 2 AND is_deleted = 0";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  registerCompany = (req, res) => {
    const { conditions, name, phone_number, dni_cif, email, password } =
      req.body;

    if (conditions) {
      //Validación para que no entren campos vacíos.
      if (
        name === "" ||
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
            let sql1 = `INSERT INTO user (name, phone_number, dni_cif, email, password, type) VALUES ('${name}','${phone_number}','${dni_cif}','${email}','${hash}',2)`;
            connection.query(sql1, (err1, result1) => {
              if (err1) {
                res.status(400).json(err1);
              } else {
                let sql2 = `INSERT INTO company (user_id) VALUES (${result1.insertId})`;
                connection.query(sql2, (err2, result2) => {
                  if (err2) {
                    res.status(400).json(err2);
                  } else {
                    res.status(200).json({ result1, result2 });
                  }
                });
              }
            });
          });
        });
      }
    } else {
      res.status(400).json("Acepta los términos");
    }
  };

  editCompany = (req, res) => {
    const { user_id } = req.params;
    const {
      name,
      phone_number,
      dni_cif,
      address,
      email,
      zip_code,
      city_id,
      province_id,
      contact_name,
      company_size,
      company_info,
      sectors,
      sepa_file,
    } = JSON.parse(req.body.register);

    //Validación para que no entren campos vacíos.
    if (
      name === "" ||
      phone_number === "" ||
      dni_cif === "" ||
      address === "" ||
      contact_name === "" ||
      sectors.length == 0 ||
      email === "" ||
      (sepa_file === "" && req.files.sepa === undefined)
    ) {
      res.status(400).json("¡No puede haber datos vacios!");
    }
    //Validación para que no superen los caracteres máximos.
    else if (
      name.length > 100 ||
      phone_number.length > 20 ||
      dni_cif.length > 9 ||
      email.length > 50 ||
      address.length > 120 ||
      zip_code.length > 5 ||
      contact_name.length > 50 ||
      company_size > 65535 ||
      company_info.length > 255
    ) {
      res.status(400).json("¡Datos demasiado largos!");
    }
    //Validación para que el usuario no meta ningún email incorrecto.
    else if (validateEmail(email) === false) {
      res.status(400).json("¡Email incorrecto!");
    } else if (dni_cif.length !== 9) {
      res.status(400).json("¡DNI/CIF incorrecto!");
    } else if (phone_number.length < 9) {
      res.status(400).json("¡Teléfono incorrecto!");
    } else if (zip_code.length >= 1 && zip_code.length < 5) {
      res.status(400).json("¡Codgio postal incorrecto!");
    } else {
      let sql1 = `UPDATE user SET name = "${name}", phone_number="${phone_number}", address="${address}", email="${email}", dni_cif="${dni_cif}", city_id =${city_id}, province_id =${province_id}, zip_code="${zip_code}", complete_profile = 1 WHERE user_id = ${user_id}`;

      let sql2 = `UPDATE company SET contact_name= '${contact_name}', company_size=${company_size}, company_info='${company_info}' WHERE user_id = ${user_id}`;

      let img = null;
      if (req.files.img) {
        img = req.files.img[0].filename;

        //Validación para que el nombre de la imagen no supere los caracteres máximos.

        if (img.length > 100) {
          res.status(400).json("¡Nombre imagen demasiado largo!");
        } else {
          sql1 = `UPDATE user SET name = "${name}", phone_number="${phone_number}", address="${address}", email="${email}", dni_cif="${dni_cif}", zip_code="${zip_code}", city_id =${city_id}, province_id =${province_id}, img= "${img}", complete_profile = 1 WHERE user_id = ${user_id}`;
        }
      }

      let sepa = null;
      if (req.files.sepa) {
        sepa = req.files.sepa[0].filename;

        //Validación para que el nombre del archivo no supere los caracteres máximos.

        if (sepa.length > 100) {
          res.status(400).json("¡Nombre imagen demasiado largo!");
        } else {
          sql2 = `UPDATE company SET contact_name= '${contact_name}', company_size=${company_size}, sepa_file= "${sepa}", company_info='${company_info}' WHERE user_id = ${user_id}`;
        }
      }

      connection.query(sql1, (err1, result1) => {
        if (err1) {
          res.status(400).json(err1);
        } else {
          connection.query(sql2, (err2, result2) => {
            if (err2) {
              res.status(400).json(err2);
            } else {
              //Llamada a función para insertar el array de sectores

              insertSectorCompany(sectors, user_id);
              res.status(200).json({ result1, result2, img, sepa });
            }
          });
        }
      });
    }
  };

  deleteCompany = (req, res) => {
    const { user_id } = req.params;
    let sql = `UPDATE user u LEFT JOIN job_offer j_o ON u.user_id = j_o.owner_user_id SET u.is_deleted = 1, j_o.is_deleted = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  buyVoucher = (req, res) => {
    const { user_id } = req.params;
    const { price, voucher_id } = req.body;

    let sql1 = `INSERT INTO voucher_user_company (voucher_id, price, user_id) VALUES (${voucher_id}, ${price}, ${user_id})`;

    connection.query(sql1, (err1, result1) => {
      if (err1) {
        res.status(400).json(err1);
      } else {
        res.status(200).json(result1);
      }
    });
  };

  getAllCompany = (req, res) => {
    let sql =
      "SELECT u.*, c.* FROM user u LEFT JOIN company c on u.user_id = c.user_id where u.type = 2 and is_deleted = 0 ORDER BY c.user_id DESC";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  filters = (req, res) => {
    const { sectors } = req.body;
    let sql1;
    let parametros1;

    if (sectors) {
      const { sql, parametros } = constructSqlSector(req.body);
      sql1 = sql;
      parametros1 = parametros;
    } else {
      const { sql, parametros } = constructSqlSinSector(req.body);
      sql1 = sql;
      parametros1 = parametros;
    }

    connection.query(sql1, parametros1, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  updateOffer = (req, res) => {
    const { user_id } = req.params;
    const { offers_number, offers_availables } = req.body;

    let sql2 = `UPDATE company SET offers_availables = (${offers_number}+${offers_availables}) where user_id = ${user_id}`;
    connection.query(sql2, (err2, result2) => {
      err2 ? res.status(400).json(err2) : res.status(200).json(result2);
    });
  };
  substractOffer = (req, res) => {
    const { user_id } = req.params;
    const { offers_availables } = req.body;

    let sql2 = `UPDATE company SET offers_availables = (${offers_availables} - 1) where user_id = ${user_id}`;
    connection.query(sql2, (err2, result2) => {
      err2 ? res.status(400).json(err2) : res.status(200).json(result2);
    });
  };

  getOneCompany = (req, res) => {
    const { user_id } = req.params;

    let sql1 = `SELECT u.*, c.*, cy.city, p.province FROM user u 
    LEFT JOIN company c on u.user_id = c.user_id 
      left join city cy on u.city_id = cy.city_id and u.province_id = cy.province_id
      left join province p on u.province_id = p.province_id
      where u.user_id = ${user_id} and u.is_deleted = 0 and u.type = 2`;

    connection.query(sql1, (err1, result) => {
      if (err1) {
        res.status(400).json(err1);
      } else {
        let sql2 = `select s_uc.*, s.sector_name from sector_user_company s_uc, sector s where s.sector_id = s_uc.sector_id and s_uc.user_id = ${user_id}`;
        connection.query(sql2, (err2, result2) => {
          let sectorTemp = result2.map((e) => ({
            value: `${e.sector_id}`,
            label: e.sector_name,
          }));

          result = { ...result[0], sectors: sectorTemp };

          err2 ? res.status(400).json(err2) : res.status(200).json({ result });
        });
      }
    });
  };

  sendOffer = (req, res) => {
    const { worker_id, email, user_id } = req.body;

    main(email, worker_id, user_id);

    res.status(200).json(true);
  };
}
module.exports = new CompanyController();
