const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API_KEY_CHATGPT, // defaults to process.env["OPENAI_API_KEY"]
});

module.exports = class AskController {
  static async askProblem(req, res, next) {
    try {
      const { questionType, message } = req.body; // Ambil tipe pertanyaan dan pesan dari req.body
      console.log(req.body);
      let content;
      if (questionType === "rekomendasi") {
        content = `Rekomendasi tanaman: ${message}`;
      } else if (questionType === "informasi") {
        content = `Informasi mengenai tanaman: ${message}`;
      } else if (questionType === "masalah") {
        content = `Masalah yang terkait dengan tanaman: ${message}`;
      } else {
        return res.status(404).json({ error: "Tipe pertanyaan tidak valid" });
      }

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${content}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log("Sampe sini", completion);
      res.status(200).json(completion.choices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
