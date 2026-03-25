import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PYTHIA_KNOWLEDGE, PYTHIA_PERSONA } from '../../component/ChatBot/knowledge';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache for responses
const responseCache = new Map<string, string>();

export async function POST(req: Request) {
  try {
    const { message, messages = [] } = await req.json();

    const lowMessage = message.toLowerCase().trim();

    // --- LAYER 1: INPUT FILTERING ---
    const forbiddenTopics = ['recipe', 'coding', 'script', 'poem', 'story', 'history', 'sports', 'weather', 'joke'];

    const isRetailRelevant = [
      'pythia', 'store', 'retail', 'pos', 'audio', 'customer',
      'staff', 'sales', 'pricing', 'hardware', 'device', 'ticket'
    ].some(word => lowMessage.includes(word));

    if (forbiddenTopics.some(topic => lowMessage.includes(topic)) && !isRetailRelevant) {
      return NextResponse.json({
        text: "I am specialized only in Pythia Store Intelligence. I cannot assist with general topics, but I'd be happy to discuss our store solutions!"
      });
    }

    // --- LAYER 2: INTENT + PRODUCT CLASSIFICATION ---

    // ✅ STRICT INTENT DETECTION (no loose matching)
    const isIntentQuery =
      /^(book|schedule|request|arrange)\b/.test(lowMessage) ||
      (
        /\b(demo|meeting|call)\b/.test(lowMessage) &&
        (lowMessage.includes("schedule") || lowMessage.includes("book") || lowMessage.includes("want") || lowMessage.includes("need"))
      );

    // ✅ PRODUCT / PYTHIA PRIORITY DETECTION
    const isProductQuery = [
      'pythia', 'system', 'device', 'audio', 'record', 'listen',
      'privacy', 'data', 'store', 'customer', 'ticket', 'feature',
      'roi', 'benefit', 'value', 'insight'
    ].some(word => lowMessage.includes(word));

    // --- PRIORITY LOGIC (VERY IMPORTANT) ---
    // 1. Product queries → ALWAYS go to AI
    // 2. Intent queries → Only if NOT product-related

    if (isIntentQuery && !isProductQuery) {
      return NextResponse.json({
        text: "I can help you with that.\n\n- Please use the demo or scheduling option available on the website\n- Or let me know your preferred time and I can guide you further"
      });
    }

    // --- CACHE CHECK ---
    if (responseCache.has(lowMessage)) {
      return NextResponse.json({ text: responseCache.get(lowMessage) });
    }

    // --- LAYER 3: AI RESPONSE ---
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PYTHIA_PERSONA },
        {
          role: "system",
          content: `Knowledge Base Context: ${JSON.stringify(PYTHIA_KNOWLEDGE)}`
        },
        ...messages.slice(-5),
        { role: "user", content: message }
      ],
      temperature: 0.3,
      max_tokens: 350,
    });

    const aiResponse = response.choices[0].message.content || "";

    // --- LAYER 4: OUTPUT CLEANING ---
    const cleanResponse = aiResponse
      .replace(/[*_#`]/g, '')        // remove markdown symbols
      .replace(/[ \t]+/g, ' ')       // remove extra spaces
      .replace(/\n\s*\n/g, '\n\n')   // clean spacing
      .trim();

    // --- CACHE STORE ---
    responseCache.set(lowMessage, cleanResponse);

    return NextResponse.json({ text: cleanResponse });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}