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
  Menu, X, UserCircle, Moon, Sun, MessageSquare 
} from "lucide-react"; // Added icons
// import TypewriterTitle from '@/components/ui/typewriter-title'; // No longer using this one for the main title
import LoopingPhrases from '@/components/ui/looping-phrases'; // Import the new component
import { useState, useEffect } from 'react'; // Added useState and useEffect
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get current path
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Use state for Sheet

  // Close mobile menu on route change
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/blog", label: "Blog", icon: <BookText className="h-4 w-4" /> },
    { href: "/guestbook", label: "Guestbook", icon: <MessageSquare className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <UserCircle className="h-4 w-4" /> },
  ];

  // Updated phrases for the main looping title
  const loopingTitlePhrases = [
    { text: "Abdul's Dev-verse" ,icon: <Activity className="h-4 w-4 sm:h-5 sm:w-5"/> }, 
    { text: "Indie Developer", icon: <Activity className="h-4 w-4 sm:h-5 sm:w-5"/> },
    { text: "Loves Hot Coffee", icon: <Coffee className="h-4 w-4 sm:h-5 sm:w-5"/> },
    { text: "Tinkers with Tech", icon: <TerminalSquare className="h-4 w-4 sm:h-5 sm:w-5"/> },
    { text: "Full-Stack Developer", icon: <Cpu className="h-4 w-4 sm:h-5 sm:w-5"/> },
  ];

  const NavLinks = ({ className, linkClassName, inSheet }: { className?: string, linkClassName?: string, inSheet?: boolean }) => {
    const pathname = usePathname();
    const navItems = [
      { href: "/", label: "Home", icon: Home },
      { href: "/about", label: "About", icon: UserCircle },
      { href: "/projects", label: "Projects", icon: Briefcase },
      { href: "/blog", label: "Blog", icon: BookText },
      { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
    ];

    return (
      <nav className={cn("flex items-center", 
        inSheet ? "flex-col space-y-4" : "space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6",
        className
      )}>
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
          const LinkContent = (
            <>
              <item.icon className={cn("mr-2 h-5 w-5", isActive && !inSheet ? "text-emerald-500 dark:text-emerald-400" : "", inSheet ? "mr-3 h-6 w-6" : "sm:h-5 sm:w-5 opacity-80")} aria-hidden="true" />
              {item.label}
            </>
          );

          return inSheet ? (
            <SheetClose asChild key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsSheetOpen(false)}
                className={cn(
                  "w-full flex items-center justify-start p-3 rounded-md text-lg font-medium transition-colors",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : "hover:bg-muted/80 dark:hover:bg-muted/50",
                  linkClassName
                )}
              >
                {LinkContent}
              </Link>
            </SheetClose>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative group inline-flex items-center px-1 py-1.5 text-sm font-medium leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus:text-gray-700 dark:focus:text-gray-300",
                isActive
                  ? "text-emerald-500 dark:text-emerald-400 md:border-b-2 md:border-emerald-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                linkClassName
              )}
            >
              {LinkContent}
              {/* Animated Underline for non-active links - only visible on larger screens */}
              {!isActive && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-400 transition-transform duration-300 ease-out origin-left scale-x-0 group-hover:scale-x-100 hidden md:block"
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
      <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between px-2 sm:px-4 md:px-6">
        {/* Left Side: Looping Title */}
        <Link href="/" className="flex items-center group transition-opacity hover:opacity-80 duration-150 overflow-hidden max-w-[calc(100%-8rem)] sm:max-w-none">
          <LoopingPhrases 
            phrases={loopingTitlePhrases} 
            containerClassName="w-auto sm:min-w-[18rem] md:min-w-[22rem] h-7 flex items-center" 
            textClassName="font-bold text-sm sm:text-base md:text-lg whitespace-nowrap truncate" 
            iconSpanClassName="mr-1 sm:mr-2 flex items-center text-foreground/90 flex-shrink-0" 
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium">
          <NavLinks />
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggleButton />
          {/* Desktop Auth Buttons */}
          {status === 'loading' && <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>}
          {status !== 'loading' && !session && (
            <Button onClick={() => signIn('github')} className="flex items-center gap-2 hover:scale-105 transition-transform duration-150 ease-in-out">
              <Github className="h-4 w-4" />
              Sign In
            </Button>
          )}
          {session?.user && (
            <div className="flex items-center gap-2">
              {session.user.image && <Image src={session.user.image} alt={session.user.name || 'User avatar'} width={32} height={32} className="rounded-full border hover:scale-105 transition-transform duration-150 ease-in-out"/>}
              <Button variant="outline" onClick={() => signOut()} className="hover:scale-105 transition-transform duration-150 ease-in-out">Sign Out</Button>
            </div>
          )}
        </div>
        
        {/* Right Side (Mobile) - Sheet Trigger and Theme Toggle */}
        <div className="md:hidden flex items-center gap-1 sm:gap-2">
          <ThemeToggleButton />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="focus:ring-2 focus:ring-primary/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col bg-background text-foreground">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center text-lg"> 
                  <Cpu className="h-5 w-5 mr-2 text-primary"/> 
                  Full-Stack Developer 
                </SheetTitle>
                {/* <SheetDescription>Navigation Menu</SheetDescription> */}
              </SheetHeader>
              <div className="flex-grow p-6 overflow-y-auto">
                <NavLinks inSheet className="w-full" linkClassName="text-base py-3" />
              </div>
              <SheetFooter className="p-6 border-t bg-muted/30 dark:bg-muted/20">
                <div className="flex flex-col items-center gap-4 w-full">
                  {status === 'loading' && <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>}
                  {status !== 'loading' && !session && (
                    <SheetClose asChild>
                      <Button onClick={() => signIn('github')} className="w-full flex items-center justify-center gap-2 text-base py-3 h-auto">
                        <Github className="h-5 w-5" />
                        Sign In
                      </Button>
                    </SheetClose>
                  )}
                  {session?.user && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2 mb-2">
                        {session.user.image && <Image src={session.user.image} alt={session.user.name || 'User avatar'} width={36} height={36} className="rounded-full border"/>}
                        <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                      </div>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={() => signOut()} className="w-full text-base py-3 h-auto">Sign Out</Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}   