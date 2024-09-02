import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { Portfolio } from '@/types/interface';

// Type for the transformed transaction data
interface TransformedTransaction {
  id: string;
  cryptocurrency: {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
  };
  amount: number;
  price_per_coin: number;
  created_at: string;
  wallet: {
    id: string;
    name: string;
    address: string;
    type: string;
  };
}

// Type for the transformed portfolio data
interface TransformedPortfolio {
  id: string;
  name: string;
  description: string;
  transactions: TransformedTransaction[];
}

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        transactions: {
          include: {
            cryptocurrency: {
              select: {
                id: true,
                symbol: true,
                name: true,
                current_price: true,
              },
            },
            wallet: {
              select: {
                id: true,
                name: true,
                address: true,
                type: true,
              },
            },
          },
        },
      },
    });

    // Transform the data as necessary before returning it
    const transformedData: TransformedPortfolio[] = portfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      transactions: portfolio.transactions.map((transaction) => ({
        id: transaction.id,
        cryptocurrency: {
          id: transaction.cryptocurrency.id,
          symbol: transaction.cryptocurrency.symbol,
          name: transaction.cryptocurrency.name,
          current_price: transaction.cryptocurrency.current_price,
        },
        amount: transaction.amount,
        price_per_coin: transaction.price_per_coin,
        created_at: transaction.created_at,
        wallet: {
          id: transaction.wallet.id,
          name: transaction.wallet.name,
          address: transaction.wallet.address,
          type: transaction.wallet.type,
        },
      })),
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
