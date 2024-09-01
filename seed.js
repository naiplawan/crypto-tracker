require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Upsert Users
  await prisma.user.upsert({
    where: { username: 'john_doe' },
    update: {},
    create: { username: 'john_doe', email: 'john@example.com', password_hash: 'hashedpassword123' },
  });

  await prisma.user.upsert({
    where: { username: 'jane_doe' },
    update: {},
    create: { username: 'jane_doe', email: 'jane@example.com', password_hash: 'hashedpassword456' },
  });

  // Upsert Portfolios
  await prisma.portfolio.upsert({
    where: { name: "John's Crypto Portfolio" },
    update: {},
    create: { userId: 1, name: "John's Crypto Portfolio", description: "Main portfolio for crypto investments" },
  });

  await prisma.portfolio.upsert({
    where: { name: "Jane's Crypto Portfolio" },
    update: {},
    create: { userId: 2, name: "Jane's Crypto Portfolio", description: "Jane's long-term crypto investments" },
  });

  // Upsert Cryptocurrencies
  await prisma.cryptocurrency.upsert({
    where: { symbol: 'BTC' },
    update: {},
    create: { symbol: 'BTC', name: 'Bitcoin', current_price: 50000.12345678, market_cap: 950000000000.00 },
  });

  await prisma.cryptocurrency.upsert({
    where: { symbol: 'ETH' },
    update: {},
    create: { symbol: 'ETH', name: 'Ethereum', current_price: 4000.12345678, market_cap: 450000000000.00 },
  });

  await prisma.cryptocurrency.upsert({
    where: { symbol: 'LTC' },
    update: {},
    create: { symbol: 'LTC', name: 'Litecoin', current_price: 200.12345678, market_cap: 15000000000.00 },
  });

  // Upsert Wallets
  await prisma.wallet.upsert({
    where: { address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    update: {},
    create: { userId: 1, name: "John's Coinbase Wallet", address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', type: 'exchange' },
  });

  await prisma.wallet.upsert({
    where: { address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy' },
    update: {},
    create: { userId: 2, name: "Jane's Ledger Wallet", address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', type: 'hardware' },
  });

  // Upsert Transactions
  await prisma.transaction.upsert({
    where: { id: 1 }, // Assuming you have a unique identifier for transactions
    update: {},
    create: {
      userId: 1,
      portfolioId: 1,
      cryptoId: 1,
      walletId: 1,
      type: 'buy',
      amount: 0.1,
      price_per_coin: 50000.12345678,
      total_value: 5000.012345678,
      fee: 10.00,
    },
  });

  await prisma.transaction.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 2,
      portfolioId: 2,
      cryptoId: 2,
      walletId: 2,
      type: 'buy',
      amount: 1.0,
      price_per_coin: 4000.12345678,
      total_value: 4000.12345678,
      fee: 5.00,
    },
  });

  // Upsert Price History
  await prisma.priceHistory.upsert({
    where: { cryptoId: 1 },
    update: {},
    create: { cryptoId: 1, price: 51000.12345678, volume: 5000000000.00, market_cap: 960000000000.00 },
  });

  await prisma.priceHistory.upsert({
    where: { cryptoId: 2 },
    update: {},
    create: { cryptoId: 2, price: 4050.12345678, volume: 600000000.00, market_cap: 460000000000.00 },
  });

  // Upsert Alerts
  await prisma.alert.upsert({
    where: { id: 1 }, // Assuming you have a unique identifier for alerts
    update: {},
    create: { userId: 1, cryptoId: 1, type: 'price_above', threshold: 60000.00 },
  });

  await prisma.alert.upsert({
    where: { id: 2 },
    update: {},
    create: { userId: 2, cryptoId: 2, type: 'price_below', threshold: 3500.00 },
  });

  // Upsert User Settings
  await prisma.userSettings.upsert({
    where: { userId: 1 },
    update: {},
    create: { userId: 1, currency_preference: 'USD', theme_preference: 'dark', notification_preferences: { email: true, sms: false } },
  });

  await prisma.userSettings.upsert({
    where: { userId: 2 },
    update: {},
    create: { userId: 2, currency_preference: 'USD', theme_preference: 'light', notification_preferences: { email: true, sms: true } },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
