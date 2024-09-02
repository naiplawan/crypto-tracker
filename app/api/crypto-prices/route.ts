import { NextApiRequest, NextApiResponse } from 'next';
import { PriceData } from '@/types/interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    const data: PriceData = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cryptocurrency prices' });
  }
}
