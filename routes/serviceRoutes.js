const express = require("express");
const router = express.Router();
const {  getServices,
         createService,
         getServiceById,
         deleteService, } = require("../controllers/service.controller")


router.route("/").get(getServices);
router.route("/").post(createService);
router.route("/").get(getServiceById);

router.route("/:id").delete(deleteService);


 

module.exports = router