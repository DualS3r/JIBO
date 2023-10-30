const connection = require("../config/database");

class AdminController {
  getAdmin = (req, res) => {
    res.send("Estoy en Admin");
  };

  enableCompany = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE company SET is_validated = 
    1 WHERE user_id = ${user_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  disableCompany = (req, res) => {
    const { user_id } = req.params;
    let sql = `UPDATE company SET is_validated = 
    0 WHERE user_id = ${user_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  addRoles = (req, res) => {
    const { role_name, description } = req.body;

    //Validación para que no entren campos vacíos.
    if (role_name === "" || description === "") {
      res.status(400).json("¡No puede haber datos vacios!");
    }
    //Validación para que no superen los caracteres máximos.
    else if (role_name.length > 100 || description.length > 255) {
      res.status(400).json("¡Datos demasiado largos!");
    } else {
      let sql = `INSERT INTO role (role_name, description) VALUES ("${role_name}","${description}")`;

      connection.query(sql, (err, result) => {
        err ? res.status(400).json(err) : res.status(200).json(result);
      });
    }
  };

  deleteRole = (req, res) => {
    const { role_id } = req.body;

    let sql = `DELETE FROM role WHERE role_id = ${role_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getAllTransaction = (req, res) => {
    let sql =
      "SELECT v_uc.*, u.name, u.dni_cif, v.name FROM voucher_user_company v_uc, user u, voucher v WHERE u.user_id = v_uc.user_id AND v.voucher_id = v_uc.voucher_id ORDER BY buy_id DESC;";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getCompanyTransaction = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT v_uc.*, u.name, v.name FROM voucher_user_company v_uc, user u, voucher v WHERE u.user_id = v_uc.user_id AND v.voucher_id = v_uc.voucher_id AND u.user_id = ${user_id} ORDER BY buy_id DESC`;

    connection.query(sql, (err, result) => {
      let finalResult = result.map((e) => ({
        ...e,
        buy_date: e.buy_date.toString().split("G")[0],
      }));
      err ? res.status(400).json(err) : res.status(200).json(finalResult);
    });
  };
}
module.exports = new AdminController();
