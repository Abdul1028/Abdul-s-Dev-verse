import type { AuthOptions, Account, Profile, User, Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import GitHubProvider, { type GithubProfile } from "next-auth/providers/github";

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error("Missing GITHUB_CLIENT_ID in .env.local");
}

if (!process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITHUB_CLIENT_SECRET in .env.local");
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account: Account | null; profile?: Profile | GithubProfile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        const githubProfile = profile as GithubProfile;
        token.id = githubProfile.id;
        token.login = githubProfile.login;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id && token.login) {
        session.user.id = token.id as number;
        session.user.login = token.login as string;
      }
      if (token && session.user) {
        // @ts-ignore 
        session.user.name = token.name || token.login || session.user.name;
      }
      return session;
    }
  }
}; 