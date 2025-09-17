const express = require("express");
const outputController = require("../Controller/ScoringPipeline");

const router = express.Router(); 
// Output APIs
router.post("/score", outputController.scoreLeads);
router.get("/results", outputController.getResults);
router.get("/results/export", outputController.getResultsFile);

module.exports = router;
