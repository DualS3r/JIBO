const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

//localhost:3000/admin
router.get("/", adminController.getAdmin);
//localhost:3000/admin/enableCompany/:user_id
router.put("/enableCompany/:user_id", adminController.enableCompany);
//localhost:3000/admin/disableCompany/:user_id
router.put("/disableCompany/:user_id", adminController.disableCompany);
//localhost:3000/admin/addRoles
router.post("/addRoles", adminController.addRoles);
//localhost:3000/admin/deleteRole
router.post("/deleteRole", adminController.deleteRole);
//localhost:3000/admin/allTransaction
router.get("/allTransaction", adminController.getAllTransaction);
//localhost:3000/admin/companyTransaction
router.get(
  "/companyTransaction/:user_id",
  adminController.getCompanyTransaction
);

module.exports = router;
