'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface AuthSessionProviderProps {
  children: React.ReactNode;
  // session?: any; // Optional: if you want to pass initial session state, but usually not needed here
}

export default function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 