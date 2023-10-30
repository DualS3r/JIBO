const connection = require("../config/database");
const { constructSqlAllOffers } = require("../utils/constructSqlOffers");

class OfferController {
  getCountOffer = (req, res) => {
    let sql =
      "SELECT count(job_offer_id) FROM job_offer WHERE is_published = 1 AND is_deleted = 0";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  createOffer = (req, res) => {
    const { user_id } = req.params;
    const {
      title,
      province_id,
      city_id,
      salary,
      min_experience,
      role_id,
      description,
    } = req.body;
    //Validación para que no entren campos vacíos.
    if (
      title === "" ||
      province_id === null ||
      city_id === null ||
      salary === null ||
      description === "" ||
      min_experience === "" ||
      role_id === null
    ) {
      return res.status(400).json("¡No puede haber datos vacios!");
    }
    //Validación para que no superen los caracteres máximos.
    else if (
      title.length > 200 ||
      description.length > 500 ||
      salary >= 100000 ||
      min_experience.length > 50
    ) {
      return res.status(400).json("¡Datos demasiado largos!");
    } else {
      let sql = `INSERT INTO job_offer (title, province_id, city_id, salary, min_experience, role_id, description, owner_user_id, is_published) VALUES ('${title}', ${province_id}, ${city_id}, ${salary}, '${min_experience}', ${role_id}, '${description}', ${user_id}, 1) `;

      connection.query(sql, (err, result) => {
        err ? res.status(400).json(err) : res.status(200).json(result);
      });
    }
  };

  editOffer = (req, res) => {
    const { user_id, offer_id } = req.params;
    const {
      title,
      province_id,
      city_id,
      salary,
      min_experience,
      role_id,
      description,
      is_published,
    } = req.body;
    //Validación para que no entren campos vacíos.
    if (
      title === undefined ||
      province_id === undefined ||
      city_id === undefined ||
      salary === undefined ||
      description === undefined ||
      min_experience === undefined ||
      role_id === undefined
    ) {
      res.status(400).json("¡No puede haber datos vacios!");
    }
    //Validación para que no superen los caracteres máximos.
    else if (
      title.length > 200 ||
      description.length > 500 ||
      salary >= 100000 ||
      min_experience.length > 50
    ) {
      res.status(400).json("¡Datos demasiado largos!");
    } else {
      let sql = `UPDATE job_offer SET title = "${title}", salary=${salary}, min_experience="${min_experience}", role_id=${role_id}, description="${description}", city_id =${city_id}, province_id =${province_id} WHERE job_offer_id = ${offer_id} and owner_user_id = ${user_id}`;

      connection.query(sql, (err, result) => {
        err ? res.status(400).json(err) : res.status(200).json(result);
      });
    }
  };

  deleteOffer = (req, res) => {
    const { user_id, offer_id } = req.params;

    let sql = `UPDATE job_offer SET is_deleted = 1 WHERE job_offer_id = ${offer_id} and owner_user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  completeOffer = (req, res) => {
    const { user_id, offer_id } = req.params;

    let sql = `UPDATE job_offer SET is_published = 0 WHERE job_offer_id = ${offer_id} and owner_user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  renewOffer = (req, res) => {
    const { user_id, offer_id } = req.params;

    let sql = `UPDATE job_offer SET is_published = 1 WHERE job_offer_id = ${offer_id} and owner_user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getAllOffer = (req, res) => {
    let sql =
      "select j_o.*, r.role_id, r.role_name, c.*, p.* from job_offer j_o, role r, city c, province p where j_o.role_id = r.role_id and j_o.city_id = c.city_id and c.province_id = j_o.province_id and j_o.province_id = p.province_id and is_deleted = 0 and is_published = 1 ORDER BY publish_date DESC";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  filters = (req, res) => {
    const { role } = req.body;
    let sql1;
    let parametros1;

    const { sql, parametros } = constructSqlAllOffers(req.body);
    sql1 = sql;
    parametros1 = parametros;
    connection.query(sql1, parametros1, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getOneOffer = (req, res) => {
    const { offer_id } = req.params;
    let sql = `select j_o.title, j_o.salary, j_o.description, j_o.min_experience, r.role_name, c.city, p.province from job_offer j_o, role r, city c, province p where j_o.role_id = r.role_id and j_o.city_id = c.city_id and c.province_id = j_o.province_id and j_o.province_id = p.province_id and job_offer_id = ${offer_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getActivesOfferOneUser = (req, res) => {
    const { user_id } = req.params;
    let sql = `select j_o.job_offer_id, j_o.title, j_o.salary, j_o.description, j_o.min_experience, r.role_name, c.city, p.province from job_offer j_o, role r, city c, province p where j_o.role_id = r.role_id and j_o.city_id = c.city_id and c.province_id = j_o.province_id and j_o.province_id = p.province_id and is_deleted = 0 and is_published = 1 and owner_user_id = ${user_id} ORDER BY job_offer_id desc`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getCompletedOfferOneUser = (req, res) => {
    const { user_id } = req.params;
    let sql = `select j_o.*, r.role_name, c.city, c.city_id, p.province, p.province_id from job_offer j_o, role r, city c, province p where j_o.role_id = r.role_id and j_o.city_id = c.city_id and c.province_id = j_o.province_id and j_o.province_id = p.province_id and is_deleted = 0 and is_published = 0 and owner_user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getAllOfferLimit = (req, res) => {
    let sql = `SELECT * FROM job_offer WHERE is_deleted = 0 and is_published = 1 ORDER BY job_offer_id DESC LIMIT 9`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
}
module.exports = new OfferController();
