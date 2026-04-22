import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/* ------------------ TEST ROUTE ------------------ */
router.get("/test-ai", (req, res) => {
  res.json({ message: "AI router is working" });
});

/* ------------------ USER ROUTE (FIX 404) ------------------ */
router.get("/users/by-email/:email", (req, res) => {
  const { email } = req.params;

  // Temporary demo user data (replace with DB later)
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  return res.json({
    name: "Demo Student",
    email,
    role: "STUDENT",
  });
});

/* ------------------ AI ROUTE ------------------ */
router.post("/ai-assistant", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY missing in .env" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);

    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (e) {
    console.error("AI Error:", e);
    res.status(500).json({ message: e.message || "AI error" });
  }
});

export default router;