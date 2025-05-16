import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

// Store your webhook secret in environment variables for security
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!GITHUB_WEBHOOK_SECRET) {
    console.error('GitHub webhook secret is not configured.');
    return NextResponse.json({ message: 'Webhook secret not configured' }, { status: 500 });
  }

  const signature = req.headers.get('x-hub-signature-256');
  const body = await req.text(); // Need raw body for signature verification

  if (!signature) {
    return NextResponse.json({ message: 'No signature provided' }, { status: 401 });
  }

  const sigHex = signature.split('=')[1];
  const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET);
  hmac.update(body);
  const digest = hmac.digest('hex');

  if (digest !== sigHex) {
    console.warn('Invalid GitHub webhook signature');
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // Signature is valid, proceed with revalidation
  try {
    const payload = JSON.parse(body);
    // Optional: Check if the push was to the main branch and affected the content path
    // For simplicity, we'll revalidate on any push event for now.
    // console.log('Received GitHub webhook payload:', payload);

    // Revalidate the blog list page
    revalidatePath('/blog', 'page'); 
    console.log('Revalidated: /blog');

    // Revalidate individual blog posts if you can determine which ones changed.
    // For a simple setup, revalidating all posts or just the main blog page might be enough initially.
    // To revalidate specific posts, you might need to inspect payload.commits
    // and find which files under GITHUB_CONTENT_PATH were added/modified.
    // Example (conceptual - needs GITHUB_CONTENT_PATH from env or config):
    // const contentPathPrefix = process.env.GITHUB_CONTENT_PATH || 'content/blog';
    // payload.commits?.forEach((commit: any) => {
    //   commit.added?.forEach((file: string) => {
    //     if (file.startsWith(contentPathPrefix) && file.endsWith('.mdx')) {
    //       const slug = file.substring(contentPathPrefix.length + 1).replace('.mdx', '');
    //       revalidatePath(`/blog/${slug}`, 'page');
    //       console.log(`Revalidated: /blog/${slug}`);
    //     }
    //   });
    //   commit.modified?.forEach((file: string) => {
    //     if (file.startsWith(contentPathPrefix) && file.endsWith('.mdx')) {
    //       const slug = file.substring(contentPathPrefix.length + 1).replace('.mdx', '');
    //       revalidatePath(`/blog/${slug}`, 'page');
    //       console.log(`Revalidated: /blog/${slug}`);
    //     }
    //   });
    // });

    return NextResponse.json({ message: 'Revalidation triggered' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook or revalidating:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
} 