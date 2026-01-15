
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key missing. Please ensure process.env.API_KEY is configured.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are the personal smart assistant for Shriharshini S, a passionate Computer Science student. You help visitors learn about her qualifications, certifications, and passions. Be professional, friendly, and academic yet creative. Use emojis sparingly but effectively 💜.",
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while connecting to the AI. Please try again later.";
  }
};
