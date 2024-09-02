import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Check if the email or username is already in use
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  if (existingUser) {
    return NextResponse.json({ message: 'Username or email already taken' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
