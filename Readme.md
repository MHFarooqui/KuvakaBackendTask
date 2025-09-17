# 🎯 Lead Scoring & Intent Classification API

This project provides a backend service to score and classify sales leads using both **rule-based logic** and **AI-powered intent detection** (Google Gemini API).  
The system allows uploading offer and lead data, scoring them, and exporting results in JSON or CSV format.

---

## 📂 Project Structure

```
├── controllers
│   ├── InputController.js    # Manages input data (offer + leads)
│   ├── ScoreController.js    # AI intent classification using Gemini
│   └── ScorePipeline.js      # Combines rule-based + AI scoring
├── routes.js                 # API routes
├── server.js                 # Express server entry point
└── README.md                 # Project documentation
```

---

## ⚙️ Features

- Upload offers and leads JSON data  
- Rule-based scoring system (role relevance, industry match, completeness)  
- AI-powered **intent classification** (`High`, `Medium`, `Low`)  
- Get results in **JSON format**  
- Export results as **CSV file download**  

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Environment Variables

Create a `.env` file in the root and add your Gemini API key:

```ini
GEMINI_API_KEY=your_api_key_here
```

### 3️⃣ Run Server

```bash
npm run serve
```

Default server runs on:  
[http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### ➕ Upload Data

**POST** `/upload`  
Upload `offer.json` and `leads.json`.

**Response:**
```json
{
  "message": "Data uploaded successfully"
}
```
![Upload Success](Assets/upload-success.png)

---

### 🏆 Run Lead Scoring

**POST** `/score`  
Processes leads using rules + AI intent.

**Response:**
```json
{
  "message": "Scoring completed",
  "results": [
    {
      "name": "John Doe",
      "role": "CEO",
      "company": "TechCorp",
      "intent": "High",
      "score": 80,
      "reasoning": "Strong match between role and offer."
    }
  ]
}
```
![Scoring Endpoint](Assets/scoring-endpoint.png)

---

### 📊 Get Results

**GET** `/results`  
Returns previously calculated scoring results in JSON.

![Results Endpoint](Assets/results-endpoint.png)

---

### 📥 Download CSV

**GET** `/download-csv`  
Downloads the scoring results as a CSV file.

![CSV Download](Assets/csv-download.png)

---

## 📌 Tech Stack

- **Node.js + Express** – Server & Routing
- **Google Gemini API** – AI-powered lead intent classification
- **json2csv** – CSV export

---