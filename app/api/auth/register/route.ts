import { connectToDB } from "@/lib/mongoDb";
import User from "@/modals/User";

import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest ) => {
   
  try {
    await connectToDB();
    const { username, email, password } = await req.json();
    
    const existingUser = await User.findOne({ email: email });
   
    if (existingUser) {
      return new Response("Email already exists", { status: 400 });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to create a new user", { status: 500 });
  }
};
