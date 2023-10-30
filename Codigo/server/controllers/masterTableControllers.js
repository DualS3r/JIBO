const connection = require("../config/database");
const {
  constructSqlSelectedProvinces,
} = require("../utils/constructSqlSelectedProvinces");

class MasterTableController {
  getAllProvince = (req, res) => {
    let sql = "SELECT * FROM province";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
  getAllCity = (req, res) => {
    let sql = "SELECT * FROM city";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
  getAllCityByProvince = (req, res) => {
    const { province_id } = req.params;
    let sql = `SELECT * FROM city where province_id = ${province_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
  getAllRole = (req, res) => {
    let sql = "SELECT * FROM role";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
  getAllVoucher = (req, res) => {
    let sql = "SELECT * FROM voucher";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
  getAllSector = (req, res) => {
    let sql = "SELECT * FROM sector ORDER BY sector_name ASC";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  select = (req, res) => {
    let sql1;
    let parametros1;
    const { sql, parametros } = constructSqlSelectedProvinces(req.body);

    sql1 = sql;
    parametros1 = parametros;
    connection.query(sql1, parametros1, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
}

module.exports = new MasterTableController();
