// ─── app/api/contact/route.js ───────────────────────────────────────────────
// Next.js API route for contact form submissions.

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ── Field Validation ───────────────────────────────────────────────────
    const errors = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (
      !email ||
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      errors.email = "Please provide a valid email address.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    // ── Sanitize inputs ────────────────────────────────────────────────────
    const sanitized = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
      console.error(
        "Contact form email is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL.",
      );
      return NextResponse.json(
        {
          success: false,
          message: "The contact form is temporarily unavailable. Please email me directly.",
        },
        { status: 503 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `New portfolio message from ${sanitized.name.replace(/[\r\n]/g, " ")}`,
      text: [
        `Name: ${sanitized.name}`,
        `Email: ${sanitized.email}`,
        `Received: ${sanitized.timestamp}`,
        "",
        sanitized.message,
      ].join("\n"),
      replyTo: sanitized.email,
    });

    if (error) {
      console.error("Resend failed to deliver contact form email:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Your message could not be sent. Please try again or email me directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thanks ${sanitized.name}! Your message has been received. I'll be in touch within 24 hours.`,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong on our end. Please try again or email directly.",
      },
      { status: 500 },
    );
  }
}

// ── Reject non-POST methods ────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
