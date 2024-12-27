"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function signup(formData: { [x: string]: string }) {
  const { username, password } = formData;

  // Connect to MongoDB
  await connectMongoDB();

  // Check user exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return { message: "User already exists" };
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name: "username",
    username: username,
    password: hashedPassword,
  });

  const user = await User.findOne({ username: username }).select("_id");
  const userId = user ? user._id.toString() : null;

  // Create session
  await createSession(userId);

  return;
}
