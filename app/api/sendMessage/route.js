import { NextResponse } from 'next/server';

export const PUT = async (req, context) => {
  try {
    const { message } = await req.json();
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SLACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: '#nextjs',
        text: message,
      }),
    });
    const result = await response.json();
    if (result.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
