import { getServerSession } from "next-auth/next";
// IMPORTANT: Replace @/app/api/auth/[...nextauth]/route with the correct path if this is not it
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import AdminControls from "@/components/admin/admin-controls"; // We will create this next
import CreatePostForm from "@/components/admin/create-post-form"; // Import the new form

// Define your admin username
const ADMIN_USERNAME = "Abdul1028";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Not logged in, redirect to NextAuth's default sign-in page or your custom one
    return redirect("/api/auth/signin?callbackUrl=/admin"); 
  }

  // Use session.user.login as it's explicitly set from token.login (GitHub username)
  // @ts-ignore session.user.login might not be in default NextAuth User type, but we add it in callbacks
  const currentUsername = session.user.login;

  if (!currentUsername) {
    // Should not happen if session exists and callbacks are correct
    // but good practice to handle this case gracefully.
    console.error("AdminPage: Username not found in session despite user being logged in.");
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg">Could not retrieve username from session. Please try logging out and back in.</p>
      </main>
    );
  }

  if (currentUsername !== ADMIN_USERNAME) {
    // Logged in, but not the admin
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg">You do not have permission to view this page.</p>
      </main>
    );
  }

  // User is logged in and is the admin
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {currentUsername}!</p>
      </header>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Blog Revalidation</h2>
        <AdminControls />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Create New Blog Post</h2>
        <CreatePostForm />
      </section>
    </main>
  );
} 