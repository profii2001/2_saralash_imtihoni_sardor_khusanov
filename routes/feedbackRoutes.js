const express = require("express");
const router = express.Router();
const { getFeedbacks, createFeedback, getFeedback, updateFeedback, deleteFeedback } = require("../controllers/feedbackController")


router.route("/").get(getFeedbacks);
router.route("/").post(createFeedback);
router.route("/").get(getFeedback);
router.route("/:id").put(updateFeedback);
router.route("/:id").delete(deleteFeedback);




module.exports = router  