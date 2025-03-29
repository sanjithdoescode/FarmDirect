import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, type, image } = await req.json();
    console.log('Received request:', { type, prompt: prompt?.slice(0, 100) });

    if (type === 'image') {
      const model = genAI.getGenerativeModel({ model: "gemini-vision-pro" });
      console.log('Using vision model for image analysis');
      
      const result = await model.generateContent([
        prompt || "What agricultural product is this?",
        { inlineData: { data: image, mimeType: "image/jpeg" } }
      ]);
      
      const response = await result.response.text();
      console.log('Image search response:', response?.slice(0, 100));
      return NextResponse.json({ success: true, data: response });
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated here
      console.log('Using text model for search');
      
      const enhancedPrompt = `Search for agricultural products: ${prompt}. Provide details about price, availability, and quality.`; //Prompt to be updated
      const result = await model.generateContent(enhancedPrompt);
      
      const response = await result.response.text();
      console.log('Text search response:', response?.slice(0, 100));
      return NextResponse.json({ success: true, data: response });
    }
  } catch (error: any) {
    console.error('API Error:', {
      message: error.message,
      details: error.details,
      stack: error.stack
    });
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}
