import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;

        const result = await openai.images.generate({
            model: "gpt-image-1",   // updated model
            prompt,
            size: "1024x1024"
        });

        const base64Image = result.data[0].b64_json;

        res.status(200).json({ photo: base64Image });

    } catch (error) {
        console.error("DALL·E error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

export default router;
