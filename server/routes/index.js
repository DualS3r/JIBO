const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

// localhost:3000/index
router.get("/", indexController.getIndex);
// localhost:3000/index/login
router.post("/login", indexController.login);
// localhost:3000/index/companyIntro
router.get("/companyIntro", indexController.getCompanyIntro);
// localhost:3000/index/workerIntro
router.get("/workerIntro", indexController.getWorkerIntro);

module.exports = router;
