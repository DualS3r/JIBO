const connection = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class IndexController {
  getIndex = (req, res) => {
    res.send("Estoy en Index");
  };

  login = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}' AND is_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (!result || !result.length) {
        res.status(401).json("aaaaaaaaaaaUsuario no autorizado");
      } else {
        //Se toman la contraseña (encriptada) y la ID del usuario de la Base de Datos
        const [user] = result;
        const hash = user.password;
        const { user_id, type } = user;

        //Se compara la contraseña enviada por el usuario con el dato encriptado de la base de datos
        bcrypt.compare(password, hash, (err, response) => {
          if (err) {
            res.status(500).json("Ups, tenemos un problema en el back!");
          }
          if (response) {
            const token = jwt.sign({ user_id, type }, process.env.SECRET, {
              expiresIn: "1d",
            });
            res.status(200).json(token);
          } else {
            res.status(400).json("Usuario no autorizado");
          }
        });
      }
    });
  };

  getCompanyIntro = (req, res) => {
    let sql =
      "SELECT u.*, w.* FROM user u LEFT JOIN worker w on u.user_id = w.user_id WHERE u.type = 1 ORDER BY u.user_id DESC LIMIT 9";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };

  getWorkerIntro = (req, res) => {
    let sql = "SELECT * FROM job_offer ORDER BY job_offer_id DESC LIMIT 9";

    connection.query(sql, (err, result) => {
      err ? res.status(400).json(err) : res.status(200).json(result);
    });
  };
}
module.exports = new IndexController();
