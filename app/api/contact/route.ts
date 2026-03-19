/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kcvm5a8w";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-03-19',
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create a new document in the Sanity dataset
    const result = await client.create({
      _type: 'contact',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message,
      status: 'new',
      submittedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
