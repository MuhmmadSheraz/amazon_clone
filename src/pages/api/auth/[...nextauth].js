import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:
        '816941034347-34f5cld78a26drpd6kh6vjiqjd8t148t.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
})
