import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { url, headers, body } = await request.json();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch from NVIDIA API' }, { status: 500 });
  }
} 