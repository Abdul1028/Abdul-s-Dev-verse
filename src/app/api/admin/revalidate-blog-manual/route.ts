import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/authOptions";

const ADMIN_USERNAME = "Abdul1028";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized: Not logged in' }, { status: 401 });
    }

    // Use session.user.login as it's explicitly set from token.login (GitHub username)
    // @ts-ignore session.user.login might not be in default NextAuth User type, but we add it in callbacks
    const currentUsername = session.user.login; 

    if (!currentUsername) {
      // Should not happen if session exists and callbacks are correct, but good to check
      return NextResponse.json({ message: 'Forbidden: Username not found in session' }, { status: 403 });
    }

    if (currentUsername !== ADMIN_USERNAME) {
      return NextResponse.json({ message: 'Forbidden: User is not an admin' }, { status: 403 });
    }

    // User is authenticated and is an admin, proceed with revalidation
    revalidatePath('/blog', 'page');
    // TODO: Consider revalidating individual posts too if many posts exist
    // const slugs = await getPostSlugs(); // from @/lib/blog
    // for (const slug of slugs) {
    //   revalidatePath(`/blog/${slug}`, 'page');
    // }

    console.log(`Manual revalidation triggered for /blog by admin: ${currentUsername}`);
    return NextResponse.json({ message: 'Blog revalidation triggered successfully! Please wait for a few seconds and refresh the /blog page to see the changes.' }, { status: 200 });

  } catch (error) {
    console.error('Error during manual blog revalidation:', error);
    return NextResponse.json({ message: 'Error triggering revalidation' }, { status: 500 });
  }
} 