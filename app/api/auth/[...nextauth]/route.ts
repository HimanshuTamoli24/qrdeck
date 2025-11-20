import env from "@/config/env";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      console.log("Signing in user:", user);
      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          profileImage: user.image,
        });
        await newUser.save();
      }
      return true;
    },
    async jwt({ token, user }) {
      await connectDB();
      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        token.role = dbUser?.isAdmin ? "admin" : "user";
        token.id = dbUser?._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        const userAny = session.user as any;
        if (typeof token.role !== "undefined") userAny.role = token.role;
        if (typeof token.id !== "undefined") userAny.id = token.id;
      }
      return session;
    }
  },
  secret: env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
