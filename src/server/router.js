// Debug route to confirm router is mounted
router.get('/test-ai', (req, res) => {
  res.json({ message: 'AI router is working' });
});
console.log('Router loaded');
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

router.post('/ai-assistant', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ message: 'Missing GEMINI_API_KEY' });
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a helpful AI for a quiz platform. Answer questions about quizzes, studying, and the platform.
Chat history:
${history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}
User: ${message}
`;

    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (e) {
    res.status(500).json({ message: e.message || 'AI error' });
  }
});

export default router;