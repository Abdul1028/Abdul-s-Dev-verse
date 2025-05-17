'use client';

// import { useSession } from "next-auth/react"; // No longer needed for basic page content

export default function HomePage() {
  // const { data: session } = useSession(); // No longer needed here

  return (
    // Main container for the page. 
    // 'overflow-hidden' is good to prevent scrollbars from the iframe.
    <main className="relative min-h-screen overflow-hidden">
      
      {/* Full-screen iframe for the interactive 3D background */}
      <iframe
        src="https://threejs-solar-system-green.vercel.app/"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          // No zIndex: iframe is part of main's stacking context, will be behind zIndex:10 elements
        }}
        title="Interactive Solar System Background"
      />

      {/* Foreground Content Wrapper - positions content at top-center */}
      <div 
        className="relative z-10 flex flex-col items-center pt-12 sm:pt-16 md:pt-20 p-4 w-full"
        style={{ pointerEvents: 'none' }} // Allows clicks to pass through to the iframe
      >
        {/* Actual Text Block - re-enables pointer events for itself */}
        <div className="text-center" style={{ pointerEvents: 'auto' }}>
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' }} // Slightly stronger shadow
          >
            Welcome to Abdul's Dev-verse
          </h1>
          <p 
            className="text-md sm:text-lg md:text-xl text-slate-200 max-w-md sm:max-w-lg lg:max-w-xl mx-auto"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' }} // Slightly stronger shadow
          >
            Building innovative solutions and bringing complex ideas to life through code. Discover my work.
          </p>
        </div>
      </div>

    </main>
  );
}
