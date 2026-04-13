import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { detectCategory, isBantSignal, extractStoreCount, extractEmail } from '@/lib/chatbot-regex';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, role, content } = body;

    // We only care about user messages
    if (role !== 'user') return NextResponse.json({ success: true });

    // Identify the topic (Pricing, Demo, etc.)
    const category = detectCategory(content);
    
    // If it's just "Hi," we don't save it to keep your Google Sheet clean
    if (!category) return NextResponse.json({ success: true, message: 'Filtered' });

    // Save to your chatbot_insights table
    const { error } = await supabaseAdmin
      .from('chatbot_insights')
      .insert([{
        session_id,
        message: content,
        category,
        bant_signal: isBantSignal(content),
        store_count: extractStoreCount(content),
        email_detected: extractEmail(content),
        intent_score: isBantSignal(content) ? 2 : 1,
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving insight:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
