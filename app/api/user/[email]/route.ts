import { connectToDB } from "@/lib/mongoDb";
import User from "@/modals/User";

import { NextRequest } from "next/server";
type Params = Promise<{ email: string }>
// {params}:{params:{email:string}}
// export default async function GPSFix() {
//   const params = await props.params;
//   // const rcdId = params.rcdId;
// }
export const GET=async (req:NextRequest,props: { params: Params })=>{
  try{
    await connectToDB()
    const params=await props.params;
    const {email} = params
  const user = await User.findOne({email})
  if(!user){
    throw new Error("User not found")
  }
  return new Response(JSON.stringify(user),{status:200})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(err:any){
    console.error(err)
throw new Error(`Failed to get user: ${err.message}`)
  }
}


export const POST=async (req:NextRequest,props: { params: Params })=>{
  try{
    await connectToDB()
    const params=await props.params;
    const {email} = params
  const user = await User.findOne({email})
  if(!user){
    throw new Error("User not found")
  }
  const {movieId}=await req.json()
  const isFavorite=user.favorites.includes(movieId)
  if(isFavorite){
    user.favorites=user.favorites.filter((id:number)=>id!==movieId)
  }else{
    user.favorites.push(movieId)
  }
  await user.save()
  return new Response(JSON.stringify(user),{status:200})
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(err:any){
    console.error(err)
throw new Error(`Failed to get user: ${err.message}`)
  }
}