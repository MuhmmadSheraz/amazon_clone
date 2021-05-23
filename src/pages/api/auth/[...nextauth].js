import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "418207647650-qhrvas9sltfsqqb9fg7f6sfiav5lo9ao.apps.googleusercontent.com",
      clientSecret: "7fPMnIuiuOWNwt5WAt6PBzqD",
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
});
