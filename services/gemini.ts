
import { GoogleGenAI, Type } from "@google/genai";
import { PARKS } from "../constants.ts";

export const getParkRecommendations = async (userQuery: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are a professional Parking Space Concierge for "ParkShare". 
    Analyze the user's needs and recommend the top spots from our list.
    The available spots are: ${JSON.stringify(PARKS.map(p => ({ id: p.id, name: p.name, location: p.location, capacity: p.capacity, category: p.category, vehicleSize: p.vehicleSize, price: p.pricePerHour })))}
    
    Consider vehicle size (Compact cars shouldn't be sent to 'Large' only spots, and vice versa).
    Mention specific amenities like EV charging or security if relevant to their request.
    Be efficient, helpful, and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  parkId: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                },
                required: ["parkId", "reasoning"]
              }
            },
            message: { type: Type.STRING }
          },
          required: ["recommendations", "message"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { recommendations: [], message: "I'm having trouble finding the perfect spot right now." };
  }
};
