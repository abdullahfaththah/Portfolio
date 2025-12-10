import { GoogleGenAI } from "@google/genai";
import { AIModelType, ImageSize } from '../types';

const getClient = () => {
  // Always create a new client to ensure the latest API key is used
  // The process.env.API_KEY is automatically updated when the user selects a key via window.aistudio
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const ensureApiKey = async (): Promise<boolean> => {
  // Access aistudio via any cast to avoid conflicts with global type definitions
  const win = window as any;
  if (win.aistudio && win.aistudio.hasSelectedApiKey) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await win.aistudio.openSelectKey();
      // Assume success after dialog close as per instructions, though in prod we might check again
      return true;
    }
    return true;
  }
  return !!process.env.API_KEY;
};

export const generateImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  const ai = getClient();
  const model = AIModelType.IMAGE_GEN;

  const response = await ai.models.generateContent({
    model,
    contents: {
        parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: "1:1", // Default to square, could be parameterized
      },
    },
  });

  // Extract image
  // For Gemini 3 Pro Image, it returns candidates with inlineData usually
  for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts) {
          if (part.inlineData) {
              return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
      }
  }
  throw new Error("No image generated");
};

export const generateVideo = async (
  imageBase64: string,
  prompt: string,
  aspectRatio: '16:9' | '9:16'
): Promise<string> => {
  const ai = getClient();
  const model = AIModelType.VIDEO_GEN;

  // Clean base64 string
  const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
  const mimeType = imageBase64.match(/^data:image\/(png|jpeg|webp);base64,/)?.[1] || "png";

  let operation = await ai.models.generateVideos({
    model,
    prompt: prompt || "Animate this image",
    image: {
      imageBytes: cleanBase64,
      mimeType: `image/${mimeType}`,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p', // Veo fast preview supports 720p or 1080p
      aspectRatio: aspectRatio
    }
  });

  // Polling
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("Video generation failed");

  // Fetch the actual video bytes using the key
  const videoUrlWithKey = `${videoUri}&key=${process.env.API_KEY}`;
  return videoUrlWithKey; 
};

export const editImage = async (
    imageBase64: string,
    prompt: string
): Promise<string> => {
    const ai = getClient();
    const model = AIModelType.IMAGE_EDIT;

    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
    const mimeType = imageBase64.match(/^data:(.*);base64,/)?.[1] || "image/png";

    const response = await ai.models.generateContent({
        model,
        contents: {
            parts: [
                {
                    inlineData: {
                        data: cleanBase64,
                        mimeType: mimeType
                    }
                },
                { text: prompt }
            ]
        }
    });

    for (const candidate of response.candidates || []) {
        for (const part of candidate.content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    throw new Error("No edited image generated");
}