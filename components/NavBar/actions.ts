"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { decrypt } from "@/lib/session";
import User from "@/models/user";
// import { cache } from "react";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export const getUser = async () => {
  // Verify user's session
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie ?? "");

  // Connect to MongoDB
  await connectMongoDB();

  // Fetch user data
  const objectId = new mongoose.Types.ObjectId(session?.userId as string);
  const data = await User.findOne({ _id: objectId }).select("name");

  if (!data) return null;

  return { name: data.name };
};
