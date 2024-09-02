// app/api/transactions/summary/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(userId) },
    });

    // Calculate the summary based on the transactions
    const summary = {
      totalSpent: transactions.reduce((sum, txn) => sum + (txn.type === 'buy' ? txn.amount : 0), 0),
      totalReceived: transactions.reduce((sum, txn) => sum + (txn.type === 'sell' ? txn.amount : 0), 0),
      netValue: transactions.reduce((sum, txn) => sum + (txn.amount), 0),
      totalFees: transactions.reduce((sum, txn) => sum + (txn.fee || 0), 0),
      transactionCount: transactions.length,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching transaction summary:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
