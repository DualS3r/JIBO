const express = require("express");
const masterTableController = require("../controllers/masterTableControllers");

const router = express.Router();

// localhost:3000/tables/getAllProvince
router.get("/getAllProvince", masterTableController.getAllProvince);
// localhost:3000/tables/getAllCity
router.get("/getAllCity", masterTableController.getAllCity);
// localhost:3000/tables/getAllCityByProvince/:province_id
router.get(
  "/getAllCityByProvince/:province_id",
  masterTableController.getAllCityByProvince
);
// localhost:3000/tables/getAllRole
router.get("/getAllRole", masterTableController.getAllRole);
// localhost:3000/tables/getAllVoucher
router.get("/getAllVoucher", masterTableController.getAllVoucher);
// localhost:3000/tables/getAllSector
router.get("/getAllSector", masterTableController.getAllSector);
//localhost:3000/tables/getAllCity/select
router.post("/getAllCity/select", masterTableController.select);

module.exports = router;
