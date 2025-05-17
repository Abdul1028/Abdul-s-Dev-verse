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
          position: 'fixed', // Positions relative to the viewport
          top: 0,
          left: 0,
          width: '100vw',   // 100% of viewport width
          height: '100vh',  // 100% of viewport height
          border: 'none',
          // zIndex: -1, // Removing z-index to see if it's causing the issue with main's stacking context
        }}
        title="Interactive Solar System Background"
        // allowFullScreen // Optional: if the source supports it and you want a fullscreen button within the iframe
      />

      {/* Foreground Content Container - currently commented out */}
      {/* <div className="relative z-10 container mx-auto px-4 py-8">
       
        <div className="bg-black bg-opacity-40 backdrop-blur-md p-6 sm:p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
            Welcome to DevPortfolio
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 mb-8 max-w-xl sm:max-w-2xl mx-auto">
            This is where your awesome projects and blog posts will shine.
          </p>
        
        </div>

        
      </div> */}

    </main>
  );
}
