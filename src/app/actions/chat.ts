"use server";

import OpenAI from 'openai';
import { PYTHIA_KNOWLEDGE, PYTHIA_PERSONA } from '../component/ChatBot/knowledge';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class LRUCache {
  private max: number;
  private cache: Map<string, string>;

  constructor(max: number) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: string): string | undefined {
    if (!this.cache.has(key)) return undefined;
    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: string, value: string): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      // Delete least recently used (first item)
      this.cache.delete(this.cache.keys().next().value!);
    }
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}

// Simple in-memory cache for responses
const responseCache = new LRUCache(500);

export async function chatAction(
  message: string,
  messages: { role: "user" | "assistant"; content: string }[] = []
): Promise<{ text: string } | { error: string }> {
  try {
    if (typeof message !== "string" || message.trim().length === 0 || message.length > 500) {
      return { error: "Invalid message." };
    }

    const safeMessages = (Array.isArray(messages) ? messages : [])
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-5);

    const lowMessage = message.toLowerCase().trim();

    // --- LAYER 1: INPUT FILTERING ---
    const forbiddenTopics = ['recipe', 'coding', 'script', 'poem', 'story', 'history', 'sports', 'weather', 'joke'];

    const isRetailRelevant = [
      'pythia', 'store', 'retail', 'pos', 'audio', 'customer',
      'staff', 'sales', 'pricing', 'hardware', 'device', 'ticket'
    ].some(word => lowMessage.includes(word));

    if (forbiddenTopics.some(topic => lowMessage.includes(topic)) && !isRetailRelevant) {
      return {
        text: "I am specialized only in Pythia Store Intelligence. I cannot assist with general topics, but I'd be happy to discuss our store solutions!"
      };
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
      return {
        text: "I can help you with that.\n\n- Please use the demo or scheduling option available on the website\n- Or let me know your preferred time and I can guide you further"
      };
    }

    // --- CACHE CHECK ---
    if (responseCache.has(lowMessage)) {
      return { text: responseCache.get(lowMessage)! };
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
        ...safeMessages,
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

    return { text: cleanResponse };

  } catch (error) {
    console.error('Chat Action Error:', error);
    return { error: 'Failed to generate response' };
  }
}
