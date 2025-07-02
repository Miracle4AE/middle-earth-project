import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=TRY&symbols=USD');
    const data = await res.json();
    if (data && data.success !== false && data.rates && typeof data.rates.USD === 'number') {
      return NextResponse.json({ usd: data.rates.USD, source: 'api' });
    } else {
      // Fallback: Sabit kur döndür
      return NextResponse.json({ usd: 0.03, source: 'fallback', error: data.error || 'API error' }, { status: 200 });
    }
  } catch (e: any) {
    // Fallback: Sabit kur döndür
    return NextResponse.json({ usd: 0.03, source: 'fallback', error: e.message || 'Unknown error' }, { status: 200 });
  }
} 