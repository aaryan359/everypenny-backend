// utils/emojiGenerator.ts
// import OpenAI from "openai";

// const openai = new OpenAI(process.env.OPENAI_API_KEY!);

// export const generateAIEmoji = async (title: string): Promise<string> => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are an emoji recommendation system. Respond with ONLY ONE emoji that best represents the following transaction title:"
//         },
//         {
//           role: "user",
//           content: title
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 4
//     });

//     const emoji = response.choices[0]?.message?.content?.trim() || "💰";
//     return emoji;
//   } catch (error) {
//     console.error("AI Emoji generation failed:", error);
//     return "💰"; // Fallback emoji
//   }
// };

import dotenv from "dotenv";
dotenv.config();

export const generateAIEmoji = async (title: string): Promise<any> => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/gemma-2b-it",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Return one emoji for: ${title}`,
          parameters: {
            max_new_tokens: 4,
            temperature: 0.2,
            repetition_penalty: 1.5,
          },
        }),
      },
    );
    console.log(" response from huggin face is", response);
    const data = await response.json();

    return data[0]?.generated_text?.trim();
  } catch (error) {
    console.error("HuggingFace error:", error);
    return;
  }
};
