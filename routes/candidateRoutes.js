const router = require("express").Router();
const candidateController = require("../controllers/condidateController");
const {
  validateCadidate,
  validateScore,
} = require("../middlewares/validation");

router.post(
  "/candidate/add",
  validateCadidate,
  candidateController.addCandidate
);

router.post("/score/add", validateScore, candidateController.addScore);
router.get("/score/highest", candidateController.highestScore);
router.get("/score/average", candidateController.averageScore);

module.exports = router;
