import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('users');
export const auth = betterAuth({
    emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins:[
    jwt()
  ],
  session:{
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7*24*60*60,
    }
  },

  // Enabled only when credentials are provided via .env
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        },
      }
    : {}),
});