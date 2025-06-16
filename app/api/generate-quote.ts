import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

export async function POST(req: NextRequest) {
  const { need } = await req.json();

  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.6,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const result = await model.call([
    new HumanMessage(
      `You're a field service quote expert. Generate a professional service quote for the following request: "${need}". Include estimated cost, service breakdown, and timeframe.`
    ),
  ]);

  return NextResponse.json({ quote: result.content });
}

