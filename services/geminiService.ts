import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is obtained from process.env.API_KEY as per guidelines.
// Assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGeminiConversion = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key 未設定。請確認環境變數 process.env.API_KEY 已正確配置。";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `
          你是一個專業、樂於助人的單位轉換助手。
          使用繁體中文 (Traditional Chinese) 回答。
          
          使用者的輸入可能是一個具體的轉換請求（例如："100坪等於幾平方公尺"），
          也可能是一個模糊的查詢（例如："101大樓有多高？" 或 "一頭大象有多重？"）。

          規則：
          1. 直接給出答案，不要廢話。
          2. 如果是數學轉換，給出精確數值。
          3. 如果是常識性查詢，給出公認的估算值，並附上常用單位（如公尺、公斤等）。
          4. 保持語氣親切專業。
          5. 不要使用 markdown 格式（如 **粗體**），純文字即可。
        `,
        temperature: 0.3, // Low temperature for deterministic/factual answers
      }
    });

    return response.text || "無法取得回應，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生錯誤，請稍後再試。";
  }
};