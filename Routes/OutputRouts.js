const express = require("express");
const outputController = require("../Controller/OutputController");

const router = express.Router(); 
// Output APIs
router.post("/score", outputController.scoreLeads);
router.get("/results", outputController.getResults);
router.get("/results/export", outputController.getResultsFile);

module.exports = router;
