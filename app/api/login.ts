// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log the request method for debugging
  console.log("Request method:", req.method);

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Log the incoming data for debugging
  console.log("Received email:", email);
  console.log("Received password:", password ? "Password provided" : "No password provided");

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Log the user data for debugging
    console.log("User found:", user ? `User ID: ${user.id}` : "No user found");

    // If user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // Log the password comparison result
    console.log("Password validity:", isPasswordValid);

    // If the password does not match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If login is successful, return the user ID
    console.log("Login successful - returning user ID:", user.id);
    return res.status(200).json({ userId: user.id });
  } catch (error) {
    // Log any errors for debugging
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
