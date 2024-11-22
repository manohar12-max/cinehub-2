import { connectToDB } from "@/lib/mongoDb";
import User from "@/modals/User";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const options:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials){
                if(!credentials?.email||!credentials?.password){
                    throw new Error('Please provide both email and password')
                }
                await connectToDB()
                const user=await User.findOne({email:credentials?.email})
                if(!user){
                    throw new Error('User not found')
                }
                const isPasswordMatch = await compare(credentials?.password,user.password)
                if(!isPasswordMatch){
                    throw new Error('Invalid credentials')
                }
                return user
              }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET
}