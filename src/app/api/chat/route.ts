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

    // --- LAYER 1: INPUT FILTERING (The Sieve) ---
    // Fast check to prevent obvious general-purpose abuse
    const lowMessage = message.toLowerCase();
    const forbiddenTopics = ['recipe', 'coding', 'script', 'poem', 'story', 'history', 'sports', 'weather', 'joke'];
    const intentKeywords = ['schedule', 'meeting', 'demo', 'book', 'call', 'contact', 'sales', 'pricing', 'plan', 'subscribe'];
    const isIntentQuery = intentKeywords.some(word => lowMessage.includes(word));
    const isRetailRelevant = ['pythia', 'store', 'retail', 'pos', 'audio', 'customer', 'staff', 'sales', 'pricing', 'hardware', 'device', 'ticket'].some(word => lowMessage.includes(word));

    if (forbiddenTopics.some(topic => lowMessage.includes(topic)) && !isRetailRelevant && !isIntentQuery) {
      return NextResponse.json({
        text: "I am specialized only in Pythia Store Intelligence. I cannot assist with general topics, but I'd be happy to discuss our store solutions!"
      });
    }

    // --- ACTION HANDLER ---
    if (isIntentQuery) {
      return NextResponse.json({
        text: "I can help you with that.\n\n- Please use the demo or scheduling option available on the website\n- Or let me know your preferred time and I can guide you further"
      });
    }

    // --- CACHE CHECK ---
    if (responseCache.has(lowMessage)) {
      return NextResponse.json({ text: responseCache.get(lowMessage) });
    }

    // --- LAYER 2: SYSTEM PROMPT & CONTEXT (The Identity) ---
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective and fast
      messages: [
        { role: "system", content: PYTHIA_PERSONA },
        {
          role: "system",
          content: `Knowledge Base Context: ${JSON.stringify(PYTHIA_KNOWLEDGE)}`
        },
        ...messages.slice(-5), // Include previous 5 messages for context
        { role: "user", content: message }
      ],
      temperature: 0.3, // Low temperature for factual consistency
      max_tokens: 350,  // Keep responses concise
    });

    const aiResponse = response.choices[0].message.content || "";

    // --- LAYER 3: OUTPUT VALIDATION (The Gatekeeper) ---
    // Ensure the AI hasn't tried to be "too helpful" with off-topic things
    // ✅ CLEAN THE RESPONSE HERE
    const cleanResponse = aiResponse
      .replace(/[*_#`]/g, '')        // remove markdown symbols
      .replace(/[ \t]+/g, ' ')       // remove extra spaces
      .replace(/\n\s*\n/g, '\n\n')   // fix spacing
      .trim();

    // ✅ STORE IN CACHE
    responseCache.set(lowMessage, cleanResponse);

    // ✅ RETURN CLEAN RESPONSE
    return NextResponse.json({ text: cleanResponse });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
