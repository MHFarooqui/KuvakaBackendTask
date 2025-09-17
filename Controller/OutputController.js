const inputController = require("./InputController");
const { classifyLeadIntent } = require("./AiClient");
const { Parser } = require("json2csv");
const fs = require("fs");


// Rule-based scoring
function ruleScore(offer, lead) {
  let score = 0;

  // Role relevance
  const role = lead.role.toLowerCase();
  if (role.includes("ceo") || role.includes("head") || role.includes("vp") || role.includes("director")) {
    score += 20;
  } else if (role.includes("manager") || role.includes("lead")) {
    score += 10;
  }

  // Industry match
  if (offer.ideal_use_cases.some(icp => lead.industry.toLowerCase().includes(icp.toLowerCase()))) {
    score += 20;
  } else if (lead.industry) {
    score += 10;
  }

  // Data completeness points
  if (lead.name && lead.role && lead.company && lead.industry && lead.location && lead.linkedin_bio) {
    score += 10;
  }
  console.log("Rule-based score:", score);
  return score;
}

module.exports = {
  // Run scoring pipeline (rule + AI later)
  scoreLeads: async (req, res) => {
    const offer = inputController.getOffer();
    const leads = inputController.getLeads();

    if (!offer || leads.length === 0) {
      return res.status(400).json({ error: "Missing offer or leads" });
    }

    const results = [];
    for (const lead of leads) {
      const rules = ruleScore(offer, lead);

      //getting intent using Ai
      const aiResult = await classifyLeadIntent(offer, lead);
      console.log("AI Result:", aiResult);
      // Map AI intent → points
      let aiPoints = 0;
      if (aiResult.intent === "High") aiPoints = 50;
      else if (aiResult.intent === "Medium") aiPoints = 30;
      else aiPoints = 10;

      const finalScore = rules + aiPoints;

      results.push({
        name: lead.name,
        role: lead.role,
        company: lead.company,
        intent: aiResult.intent,
        score: finalScore,
        reasoning: aiResult.reasoning,
      });
    }

    inputController.setResults(results);
    res.json({ message: "Scoring completed", results });
  },

  // Return results
  getResults: (req, res) => {
    const results = inputController.getResults();
    if (results.length === 0) {
      return res.json({ message: "No results available yet" });
    }
    res.json(results);
  },

  // Export results as CSV
  getResultsFile: (req, res) => {
    try {
      const results = inputController.getResults();
      if (results.length === 0) {
        return res.status(400).json({ error: "No results to export" });
      }
      filePath = "results.csv";
      const parser = new Parser();
      const csv = parser.parse(results);

      res.header("Content-Type", "text/csv");
      res.attachment("leads_results.csv");
      return res.send(csv);
    } catch (err) {
      console.error("CSV Export Error:", err);
      return res.status(500).json({ error: "Failed to export CSV" });
    }
  }

};
