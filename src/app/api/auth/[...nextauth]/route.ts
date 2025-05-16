import NextAuth, { type AuthOptions, type Account, type Profile, type User, type Session } from "next-auth"
import { type JWT } from "next-auth/jwt"
import GithubProvider, { type GithubProfile } from "next-auth/providers/github"

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error("Missing GITHUB_CLIENT_ID in .env.local")
}

if (!process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITHUB_CLIENT_SECRET in .env.local")
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here if needed
  ],
  // secret: process.env.NEXTAUTH_SECRET, // NextAuth.js v4 automatically uses NEXTAUTH_SECRET
  // jwt: { // Optional: customize JWT encoding/decoding if needed
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account: Account | null; profile?: Profile | GithubProfile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token
        // The `profile` object from GitHubProvider is GithubProfile
        const githubProfile = profile as GithubProfile;
        token.id = githubProfile.id 
        token.login = githubProfile.login 
        // user.image is automatically set by NextAuth from profile.avatar_url
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id && token.login) {
        session.user.id = token.id as number; // Ensure it is number if it exists
        session.user.login = token.login as string; // Ensure it is string if it exists
        // session.user.image is already populated by NextAuth from avatar_url
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 