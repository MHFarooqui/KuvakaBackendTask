const fs = require("fs");
const csv = require("csv-parser");

let offer = null;
let leads = [];
let results = [];

module.exports = {
  // Save offer details
  saveOffer: (req, res) => {
    offer = req.body;
    results = []; // reset previous results
    res.json({ message: "Offer saved successfully", offer });
  },

  // Upload and parse leads CSV
  uploadLeads: (req, res) => {
    const filePath = req.file.path;
    const newLeads = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => newLeads.push(row))
      .on("end", () => {
        leads = newLeads;
        console.log(`Parsed ${leads.length} leads`);
        fs.unlinkSync(filePath); // delete temp file
        results = [];
        res.json({ message: "Leads uploaded successfully", count: leads.length });
      });
  },

  getOffer: () => offer,
  getLeads: () => leads,
  setResults: (scoredResults) => { results = scoredResults; },
  getResults: () => results
};
