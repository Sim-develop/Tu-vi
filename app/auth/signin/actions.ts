"use server";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

export async function signin(formData: { [x: string]: string }) {
  const { username, password } = formData;

  // Connect to MongoDB
  await connectMongoDB();

  // Check user exists
  const existingUser = await User.findOne({ username }).select("password");
  if (!existingUser) {
    return { message: "Please check username or password again" };
  }

  // Check password matches
  const hashedPassword = existingUser.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    return { message: "Please check username or password again" };
  } else {
    const userId = existingUser._id.toString();

    // Create session
    await createSession(userId);

    return;
  }
}
