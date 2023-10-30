const express = require("express");
const workerController = require("../controllers/workerController");
const multer = require("../middlewares/multer");

const router = express.Router();

//localhost:3000/worker/countWorker
router.get("/countWorker", workerController.getCountWorker);
//localhost:3000/worker/oneWorker/:worker_id
router.get("/oneWorker/:worker_id", workerController.getOneWorker);
//localhost:3000/worker/registerWorker
router.post("/registerWorker", workerController.registerWorker);
//localhost:3000/worker/editWorker/:worker_id
router.put(
  "/editWorker/:worker_id",
  multer("images", "worker_profile"),
  workerController.editWorker
);
//localhost:3000/worker/otherInfoWorker/:worker_id
router.put("/otherInfoWorker/:worker_id", workerController.otherInfoWorker);
//localhost:3000/worker/cvInfoWorker/:worker_id
router.put(
  "/cvInfoWorker/:worker_id",
  multer("documents", "worker_documents"),
  workerController.cvInfoWorker
);
//localhost:3000/worker/preferInfoWorker/:worker_id
router.put("/preferInfoWorker/:worker_id", workerController.preferInfoWorker);
// localhost:3000/worker/deleteWorker/:worker_id
router.put("/deleteWorker/:worker_id", workerController.deleteWorker);
//localhost:3000/worker/allWorkers
router.get("/allWorkers", workerController.allWorkers);
//localhost:3000/worker/allWorkers/filters
router.post("/allWorkers/filters", workerController.filters);
//localhost:3000/worker/workerApplyOffer
router.post("/workerApplyOffer/:worker_id", workerController.workerApplyOffer);
//localhost:3000/worker/allWorkerApplierOffer
router.get(
  "/allWorkerApplierOffer/:offer_id",
  workerController.allWorkerApplierOffer
);
//localhost:3000/worker/deleteAppliersOffer
router.post("/deleteAppliersOffer", workerController.deleteAppliersOffer);
//localhost:3000/worker/allApplierOneOffer
router.get(
  "/allApplierOneOffer/:offer_id",
  workerController.allApplierOneOffer
);
//localhost:3000/worker/worker_profile/option/:worker_id
router.put("/worker_profile/option/:worker_id", workerController.changeOption);
//localhost:3000/worker/workerOffers/:worker_id
router.get("/workerOffers/:worker_id", workerController.workerOffers);
//localhost:3000/worker/workerLimit
router.get("/workerLimit", workerController.workerLimit);

module.exports = router;
