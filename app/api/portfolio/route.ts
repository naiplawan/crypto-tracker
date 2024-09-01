// app/api/portfolio/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient'; // Ensure the correct import path

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        user: true,
        transactions: {
          include: {
            cryptocurrency: true,
            wallet: true,
          },
        },
      },
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
