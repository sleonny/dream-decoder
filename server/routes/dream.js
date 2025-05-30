const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { dream } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a surreal and symbolic dream interpreter who gives thoughtful, poetic interpretations.",
        },
        {
          role: "user",
          content: `Please interpret the following dream: "${dream}"`,
        },
      ],
    });

    const interpretation = completion.choices[0].message.content;
    res.json({ message: interpretation });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong with dream interpretation." });
  }
});

module.exports = router;
