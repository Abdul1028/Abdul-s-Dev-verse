"use client"
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareText } from 'lucide-react';

const GuestbookPage = () => {
  const giscusContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusContainerRef.current) {
      return;
    }

    // Clear any existing giscus instance
    giscusContainerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "abdul1028/KalTrack");
    script.setAttribute("data-repo-id", "R_kgDOMxa8Bg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOMxa8Bs4CqPAs");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    giscusContainerRef.current.appendChild(script);

    // Optional: Clean up the script when the component unmounts
    return () => {
      if (giscusContainerRef.current) {
        giscusContainerRef.current.innerHTML = '';
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 flex items-center justify-center gap-3">
          <MessageSquareText className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
          Guestbook
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to the guestbook! I'd love to hear your thoughts on my portfolio. Feel free to leave a comment, share feedback, or just say hi. 
          Your insights help me grow and improve. Thank you for visiting!
        </p>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card/80 backdrop-blur-sm border-emerald-500/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">Leave Your Mark</CardTitle>
          <CardDescription>
            Share your feedback, suggestions, or a simple hello below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={giscusContainerRef} className="giscus-container">
            {/* Giscus script will be injected here */}
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .giscus-container {
          margin-top: 1rem; /* Adjusted margin */
        }
        .giscus-frame {
          border-radius: 0.5rem; /* Optional: if you want to round giscus iframe corners */
        }
      `}</style>
    </div>
  );
};

export default GuestbookPage; 