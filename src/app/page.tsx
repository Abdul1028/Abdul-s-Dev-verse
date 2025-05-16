'use client';

// import { useSession } from "next-auth/react"; // No longer needed for basic page content

export default function HomePage() {
  // const { data: session } = useSession(); // No longer needed here

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6">
          Welcome to DevPortfolio
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This is where your awesome projects and blog posts will shine.
        </p>
        {/* You can add more content or components here as you build out your homepage */}
        {/* For example, a call to action button or a brief intro */}
        {/* <Button size="lg">Explore Projects</Button> */}
      </div>
    </main>
  );
}
