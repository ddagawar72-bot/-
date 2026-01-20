
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initialized using the exact recommended pattern for process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async simulateHairColor(imageBase64: string, colorName: string, colorCode: string): Promise<string | null> {
    try {
      // Using gemini-2.5-flash-image as the default model for image editing tasks
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: imageBase64.split(',')[1],
                mimeType: 'image/png',
              },
            },
            {
              text: `You are a professional hair stylist AI. Change ONLY the hair color of the person in the provided image to the Milbon professional hair color: ${colorName} (${colorCode}). 
              Instructions:
              1. Maintain the original hairstyle, lighting, and texture.
              2. Do not change the face, skin, or background.
              3. Ensure the hair color transition looks natural and professional.
              4. Return the edited image.`,
            },
          ],
        },
      });

      // Iterating through candidates and parts to find the generated image as per guidelines
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Simulation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
