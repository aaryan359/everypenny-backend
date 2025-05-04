// utils/emojiGenerator.ts
import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY!);

export const generateAIEmoji = async (title: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an emoji recommendation system. Respond with ONLY ONE emoji that best represents the following transaction title:"
        },
        {
          role: "user",
          content: title
        }
      ],
      temperature: 0.7,
      max_tokens: 4
    });

    const emoji = response.choices[0]?.message?.content?.trim() || "💰";
    return emoji;
  } catch (error) {
    console.error("AI Emoji generation failed:", error);
    return "💰"; // Fallback emoji
  }
};