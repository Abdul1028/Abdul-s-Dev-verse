import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's GitHub ID. */
      id?: number | null | undefined
      /** The user's GitHub username. */
      login?: string | null | undefined
      // image is already part of DefaultSession.user
    } & DefaultSession["user"] // Extends the default user properties (name, email, image)
  }

  /** The OAuth profile returned from your provider */
  interface Profile {
    id?: number
    login?: string
    // Add other GitHub profile properties if needed
  }

  // Optional: If you are heavily modifying the User object passed to JWT/Session callbacks
  // interface User extends DefaultUser {
  //   id?: number | null | undefined
  //   login?: string | null | undefined
  // }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** GitHub ID */
    id?: number | null | undefined
    /** GitHub username */
    login?: string | null | undefined
    /** OpenID ID Token */
    // idToken?: string
    accessToken?: string
  }
} 