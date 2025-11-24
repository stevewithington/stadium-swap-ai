import { GoogleGenAI } from "@google/genai";
import { FanConfig } from "../types";

/**
 * Transforms an image to look like stadium fans based on configuration.
 * @param base64Image The source image in base64 format (without data prefix).
 * @param mimeType The mime type of the source image.
 * @param config The user configuration for the transformation.
 * @returns The base64 data URL of the generated image.
 */
export const transformToFans = async (
  base64Image: string,
  mimeType: string,
  config: FanConfig
): Promise<string> => {
  // Initialize Gemini Client inside the function to ensure we use the latest API KEY
  // from the environment after the user selects it.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = "gemini-3-pro-image-preview";

  // Construct a detailed prompt for the edit
  const prompt = `
    Transform this image into a realistic photo of enthusiastic ${config.sport} fans at a stadium.
    
    Requirements:
    1. Replace the clothes of the people with ${config.teamColors} sports jerseys, scarves, caps, and face paint appropriate for ${config.sport}.
    2. Make them look excited, cheering, or intense based on a ${config.intensity} intensity level.
    3. Replace the entire background with a realistic, crowded ${config.sport} stadium scene during a ${config.atmosphere}.
    4. Ensure the lighting on the people matches the stadium environment (e.g., stadium floodlights or sunlight).
    5. Maintain the identity, facial features, and pose of the original people as much as possible, but fully integrate them into the fan scene.
    6. High quality, photorealistic style.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
          imageSize: "1K"
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates.length > 0) {
      const content = response.candidates[0].content;
      if (content && content.parts) {
        for (const part of content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          }
        }
      }
    }

    throw new Error("No image was generated. The model might have refused the request or returned text only.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to transform image.");
  }
};
