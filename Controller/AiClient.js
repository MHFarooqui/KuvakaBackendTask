require('dotenv').config()
const {GoogleGenerativeAI}  = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function classifyLeadIntent(offer, lead) {
  try {
    const prompt = `
      You are a sales lead qualification assistant.
        Offer:
        - Name: ${offer.name}
        - Value Props: ${offer.value_props.join(", ")}
        - Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

        Lead:
        - Name: ${lead.name}
        - Role: ${lead.role}
        - Company: ${lead.company}
        - Industry: ${lead.industry}
        - Location: ${lead.location}
        - LinkedIn Bio: ${lead.linkedin_bio}

        Task:
        Classify this lead's buying intent as High, Medium, Low.
        Respond in JSON with keys: "intent" and "reasoning".
        keep the reasoning concise (1 sentence).
        `;

    const result = await model.generateContent(prompt);
    console.log("Gemini Raw Response:", result.response.text());
    
    // Gemini sometimes wraps JSON in text, so we parse safely
    const raw = result.response.text();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // fallback if JSON parse fails
    return { intent: "Unknown", explanation: raw };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { intent: "Error", explanation: error.message };
  }
}

module.exports = { classifyLeadIntent };
    