const express = require("express");
const companyController = require("../controllers/companyController");
const multerInput = require("../middlewares/multerInputs");

const router = express.Router();

//localhost:3000/company/countCompany
router.get("/countCompany", companyController.getCountCompany);
// localhost:3000/company/registerCompany
router.post("/registerCompany", companyController.registerCompany);
// localhost:3000/company/completeRegisterCompany
router.put(
  "/editCompany/:user_id",
  multerInput(),
  companyController.editCompany
);
// localhost:3000/company/deleteCompany
router.put("/deleteCompany/:user_id", companyController.deleteCompany);
// localhost:3000/company/buyVoucher
router.post("/buyVoucher/:user_id", companyController.buyVoucher);
// localhost:3000/company/updateOffer
router.put("/updateOffer/:user_id", companyController.updateOffer);
// localhost:3000/company/substractOffer
router.put("/substractOffer/:user_id", companyController.substractOffer);
// localhost:3000/company/getOneCompany
router.get("/getOneCompany/:user_id", companyController.getOneCompany);
//localhost:3000/company/allCompany
router.get("/allCompany", companyController.getAllCompany);
//localhost:3000/company/allCompany/filters
router.post("/allCompany/filters", companyController.filters);
// localhost:3000/company/sendOffer
router.post("/sendOffer", companyController.sendOffer);

module.exports = router;
