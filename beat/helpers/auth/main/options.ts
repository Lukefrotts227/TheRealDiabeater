import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectDB from '@/mongo/mongoose';
import { NextAuthOptions } from 'next-auth'; 
import User from "@/models/auth/user"; 
import Account from '@/models/auth/account'; 
import mongoose from 'mongoose'; 

import { OAuthConfig } from "next-auth/providers/oauth";



const FitbitProvider: OAuthConfig<any> = {
    id: "fitbit",
    name: "Fitbit",
    type: "oauth",
    version: "2.0",
    authorization: "https://www.fitbit.com/oauth2/authorize",
    token: "https://api.fitbit.com/oauth2/token",
    userinfo: "https://api.fitbit.com/1/user/-/profile.json",
    clientId: process.env.FITBIT_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    profile(profile : any) {
      return {
        id: profile.user.encodedId,
        name: profile.user.fullName,
        email: profile.user.email,
        image: profile.user.avatar,
      };
    },
  };

const authOptions: NextAuthOptions  = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
        }), 
        FitbitProvider, 
    ], 
    session: {
        strategy:'jwt', 
    }, 
    secret: process.env.NEXT_AUTH_SECRET, 
    
    callbacks: {
        async signIn({ user, account }) {
          try {
            // Ensure the database connection is established
            await connectDB();
      
            const providerAccountId = account?.providerAccountId;
      
            // Check if the account is already linked based on the provider's user ID
            console.log('here'); 
            const existingAccount = await Account.findOne({
              provider: account?.provider,
              providerAccountId: providerAccountId,  // Use the provider's user ID for account linking
            });
            console.log("made it after the existing account!!"); 
      
            if (!existingAccount) {
              // If the account is not linked, find the user in MongoDB or create a new one
              // chech if the user is existing
              let existingUser = await User.findOne({ email: user.email}); 
              if(!existingUser){
                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                });
                const newAccount = await Account.create({
                    userId: newUser._id,  // This is the MongoDB ObjectId
                    provider: account?.provider,
                    providerAccountId: providerAccountId,  // This is the OAuth provider's user ID
                    accessToken: account?.access_token,
                    refreshToken: account?.refresh_token,
                  });
                  
                  const accountId = newAccount._id as mongoose.Types.ObjectId;

                  newUser.accounts.push(accountId);
                  await newUser.save(); 
                }else{
                    const newAccount = await Account.create({
                        userId: existingUser._id,  // MongoDB ObjectId of the existing user
                        provider: account?.provider,
                        providerAccountId: providerAccountId,  // OAuth provider's user ID
                        accessToken: account?.access_token,
                        refreshToken: account?.refresh_token,
                      });
                    const accountId = newAccount._id as mongoose.Types.ObjectId;
                    const accountExistsInUser = existingUser.accounts.includes(accountId);
                    if (!accountExistsInUser) {
                        existingUser.accounts.push(accountId);
                        await existingUser.save();  // Save the updated user document
                      }
                  }
              } 
      
             
      
            return true;
          } catch (e) {
            console.error('Error during sign-in:', e);
            return false;
          }
        },
      },
      
      

}


export default authOptions