import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        '816941034347-8njv3rpsj6n8onpknicg7k4epabopqd2.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
})
