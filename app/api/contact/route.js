// ─── app/api/contact/route.js ───────────────────────────────────────────────
// Next.js API route for contact form submissions.
// In production, replace the console.log with an email service (Resend, SendGrid, etc.)

import { NextResponse } from 'next/server';

// Simple email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ── Field Validation ───────────────────────────────────────────────────
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 }
      );
    }

    // ── Sanitize inputs ────────────────────────────────────────────────────
    const sanitized = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // ── Simulate processing delay (replace with real email service) ────────
    await new Promise((resolve) => setTimeout(resolve, 500));

    // ── Log submission (replace with email send in production) ────────────
    console.log('📧 New contact form submission:', {
      from: sanitized.name,
      email: sanitized.email,
      preview: sanitized.message.substring(0, 100),
      timestamp: sanitized.timestamp,
    });

    // ── TODO: Integrate with email service ─────────────────────────────────
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'your@email.com',
    //   subject: `New message from ${sanitized.name}`,
    //   text: sanitized.message,
    //   replyTo: sanitized.email,
    // });

    return NextResponse.json(
      {
        success: true,
        message: `Thanks ${sanitized.name}! Your message has been received. I'll be in touch within 24 hours.`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong on our end. Please try again or email directly.',
      },
      { status: 500 }
    );
  }
}

// ── Reject non-POST methods ────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
