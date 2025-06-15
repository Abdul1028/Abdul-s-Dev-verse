'use client';

// import { useSession } from "next-auth/react"; // No longer needed for basic page content

import { Github, Linkedin, Instagram, Code, Link } from 'lucide-react'; // Removed Twitter, Added Link for Linktree
import { useRouter } from 'next/navigation';
export default function HomePage() {
  // const { data: session } = useSession(); // No longer needed here

  const router = useRouter();

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Abdul1028' }, // Replace with your URL
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/yourusername' }, // Replace with your URL
    { name: 'Linktree', icon: Link, url: 'https://linktr.ee/abduldotexe' }, // Replace with your URL
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/props.username' }, // Replace with your URL
    { name: 'LeetCode', icon: Code, url: 'https://leetcode.com/Abdul1028' }, // Replace with your URL (using generic Code icon)
  ];

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
        className="relative z-10 flex flex-col items-center pt-15 sm:pt-12 md:pt-16 p-4 w-full mt-15 "
        style={{ pointerEvents: 'none' }} // Allows clicks to pass through to the iframe
      >
        {/* Actual Text Block - re-enables pointer events for itself */}
        <div className="text-center" style={{ pointerEvents: 'auto' }}>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white"
            style={{ textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)' }} // Reverted to stronger, multi-layered dark shadow
          >
            <span>Welcome to </span>
            <span className="text-emerald-400">Abdul's Dev-verse</span>
          </h1>
          <p
            className="text-xs sm:text-sm text-slate-300 max-w-sm sm:max-w-md md:max-w-lg mx-auto mb-6"
            style={{ textShadow: '0 0 5px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.5)' }} 
          >
            Building innovative solutions and bringing complex ideas to life through code. Discover my work.
          </p>
          
          <a href="#projects" className="no-underline group cursor-pointer inline-block"
             style={{ animationFillMode: 'forwards' }}> 
            <button className="bg-slate-800 no-underline relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white group active:scale-95 transition-transform duration-150">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-zinc-900"  onClick={()=>{router.push("/projects")}} >
                <span className="transition-colors duration-300 group-hover:text-sky-300"  >
                  View Projects
                </span>
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </a>

        </div>
      </div>

      {/* Footer Social Links Bar */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-10 p-4 sm:p-6 flex justify-center items-center mb-5"
        style={{ pointerEvents: 'auto' }} // This whole bar is interactive
      >
        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-200 hover:text-white transform hover:scale-105 transition-all duration-200 ease-in-out group"
              style={{ textShadow: '0 0 6px rgba(0,0,0,0.7)' }}
            >
              <link.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
              {link.name}
            </a>
          ))}
        </div>
      </footer>

    </main>
  );
}
