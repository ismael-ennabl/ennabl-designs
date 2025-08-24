import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { tenant = 'design' } = await req.json().catch(() => ({ tenant: 'design' }));
  const mockUrl = process.env.MOCK_URL || 'http://localhost:8787';
  const token = process.env.MOCK_TOKEN;

  try {
    const res = await fetch(`${mockUrl}/reseed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ tenant })
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: data?.error || 'Reseed failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, tenant });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Network error' }, { status: 500 });
  }
}


