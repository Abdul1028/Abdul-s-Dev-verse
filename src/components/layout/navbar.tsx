'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // For active link styling
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Github, Home, BookText, Briefcase,
  Activity, Coffee, TerminalSquare, Cpu,
  Menu, X, UserCircle, Moon, Sun // Added UserCircle for About
} from "lucide-react"; // Added icons
// import TypewriterTitle from '@/components/ui/typewriter-title'; // No longer using this one for the main title
import LoopingPhrases from '@/components/ui/looping-phrases'; // Import the new component
import { useState, useEffect } from 'react'; // Added useState and useEffect
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get current path
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/blog", label: "Blog", icon: <BookText className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <UserCircle className="h-4 w-4" /> },
  ];

  // Updated phrases for the main looping title
  const loopingTitlePhrases = [
    { text: "Abdul's Dev-verse" ,icon: <Activity className="h-5 w-5"/> }, 
    { text: "Indie Developer", icon: <Activity className="h-5 w-5"/> },
    { text: "Loves Hot Coffee", icon: <Coffee className="h-5 w-5"/> },
    { text: "Tinkers with Tech", icon: <TerminalSquare className="h-5 w-5"/> },
    { text: "Full-Stack Developer", icon: <Cpu className="h-5 w-5"/> },
  ];

  const NavLinks = ({ className, linkClassName }: { className?: string, linkClassName?: string }) => {
    const pathname = usePathname();
    const navItems = [
      { href: "/", label: "Home", icon: Home },
      { href: "/projects", label: "Projects", icon: Briefcase },
      { href: "/blog", label: "Blog", icon: BookText },
      { href: "/about", label: "About", icon: UserCircle },
    ];

    return (
      <nav className={cn("flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6", className)}>
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative group inline-flex items-center px-1 pt-1 pb-1.5 text-sm font-medium leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus:text-gray-700 dark:focus:text-gray-300",
                isActive
                  ? "border-b-2 border-emerald-400 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                linkClassName
              )}
            >
              <item.icon className="mr-1 sm:mr-1.5 h-4 w-4 sm:h-5 sm:w-5 opacity-80" aria-hidden="true" />
              {item.label}
              {/* Animated Underline for non-active links */}
              {!isActive && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-400 transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100"
                />
              )}
            </Link>
          );
        })}
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        {/* Left Side: Looping Title - This is now the primary title element */}
        <Link href="/" className="flex items-center group transition-opacity hover:opacity-80 duration-150">
          <LoopingPhrases 
            phrases={loopingTitlePhrases} 
            containerClassName="min-w-[22rem] h-7 flex items-center" // Ensure vertical alignment and reserve space
            textClassName="font-bold text-lg whitespace-nowrap" // Prominent styling for all typed text
            iconSpanClassName="mr-2 flex items-center text-foreground/90" // Styling for icon container
            // Note: icon size is now set directly in the loopingTitlePhrases array for each icon
          />
        </Link>

        {/* Center: Desktop Navigation Links - Hidden on md and below initially */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium">
          <NavLinks />
        </div>

        {/* Right Side: Theme Toggle & Auth Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="group" // For ThemeToggleButton visual child hover
            asChild // To pass group hover to ThemeToggleButton if it's wrapped
          >
            <ThemeToggleButton />
          </Button>
          
          {status === 'loading' && (
            <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div> /* Adjusted placeholder size */
          )}

          {status !== 'loading' && !session && (
            <Button onClick={() => signIn('github')} className="flex items-center gap-2 hover:scale-105 transition-transform duration-150 ease-in-out">
              <Github className="h-4 w-4" />
              Sign In
            </Button>
          )}

          {session?.user && (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || 'User avatar'} 
                  width={32}
                  height={32}
                  className="rounded-full border hover:scale-105 transition-transform duration-150 ease-in-out"
                />
              )}
              <Button variant="outline" onClick={() => signOut()} className="hover:scale-105 transition-transform duration-150 ease-in-out">
                Sign Out
              </Button>
            </div>
          )}
        </div>
        
        {/* Hamburger Menu Button - Visible on md and below */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel - Conditional rendering based on state */} 
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg border-t border-border/40">
          <nav className="flex flex-col items-center gap-4 p-6 text-base font-medium">
            <NavLinks className="flex flex-col items-center gap-4 w-full" linkClassName="w-full" />
            <hr className="w-full border-border/40 my-2" />
            {/* Mobile Auth Actions & Theme Toggle */}
            <div className="flex flex-col items-center gap-4 w-full">
              {status === 'loading' && (
                <div className="h-9 w-full bg-muted rounded-md animate-pulse"></div>
              )}
              {status !== 'loading' && !session && (
                <Button onClick={() => { signIn('github'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Sign In
                </Button>
              )}
              {session?.user && (
                <Button variant="outline" onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="w-full">
                  Sign Out
                </Button>
              )}
              <div className="mt-2">
                 <ThemeToggleButton />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}   