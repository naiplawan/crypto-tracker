import axios from 'axios';

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  quantity: number;
}

export const fetchCryptoData = async (): Promise<CoinData[]> => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,litecoin', // Add more coin IDs as needed
      },
    });

    const data: CoinData[] = response.data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      quantity: 1, //
    }));

    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};
