const express = require("express");
const offerController = require("../controllers/offerController");

const router = express.Router();

//localhost:3000/offer/countOffer
router.get("/countOffer", offerController.getCountOffer);
// localhost:3000/offer/getAllOffer
router.get("/getAllOffer", offerController.getAllOffer);
// localhost:3000/offer/getAllOffer/filters
router.post("/getAllOffer/filters", offerController.filters);
// localhost:3000/offer/getOneOffer
router.get("/getOneOffer/:offer_id", offerController.getOneOffer);
// localhost:3000/offer/getActivesOfferOneUser
router.get(
  "/getActivesOfferOneUser/:user_id",
  offerController.getActivesOfferOneUser
);
// localhost:3000/offer/getCompletedOfferOneUser
router.get(
  "/getCompletedOfferOneUser/:user_id",
  offerController.getCompletedOfferOneUser
);
// localhost:3000/offer/createOffer
router.post("/createOffer/:user_id", offerController.createOffer);
// localhost:3000/offer/editOffer
router.put("/editOffer/:user_id/:offer_id", offerController.editOffer);
// localhost:3000/offer/deleteOffer
router.put("/deleteOffer/:user_id/:offer_id", offerController.deleteOffer);
// localhost:3000/offer/completeOffer
router.put("/completeOffer/:user_id/:offer_id", offerController.completeOffer);
// localhost:3000/offer/renewOffer
router.put("/renewOffer/:user_id/:offer_id", offerController.renewOffer);
// localhost:3000/offer/getAllOfferLimit
router.get("/getAllOfferLimit", offerController.getAllOfferLimit);

module.exports = router;
