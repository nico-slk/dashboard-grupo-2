import { connectDB } from '@/libs/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials?.email }).select('+password');

          const isEqualPassword = await bcrypt.compare(credentials!.password, user?.password || '');

          return (user && isEqualPassword) ? user : null;

        } catch (error) {
          console.error(error);

        }
      },
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/'
  }
});

export { handler as GET, handler as POST };

