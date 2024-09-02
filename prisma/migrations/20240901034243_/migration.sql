/*
  Warnings:

  - A unique constraint covering the columns `[cryptoId,timestamp]` on the table `PriceHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PriceHistory" ALTER COLUMN "timestamp" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Alert_userId_idx" ON "Alert"("userId");

-- CreateIndex
CREATE INDEX "Alert_cryptoId_idx" ON "Alert"("cryptoId");

-- CreateIndex
CREATE INDEX "Cryptocurrency_symbol_idx" ON "Cryptocurrency"("symbol");

-- CreateIndex
CREATE INDEX "Portfolio_userId_idx" ON "Portfolio"("userId");

-- CreateIndex
CREATE INDEX "PortfolioToCryptocurrency_portfolioId_idx" ON "PortfolioToCryptocurrency"("portfolioId");

-- CreateIndex
CREATE INDEX "PortfolioToCryptocurrency_cryptocurrencyId_idx" ON "PortfolioToCryptocurrency"("cryptocurrencyId");

-- CreateIndex
CREATE INDEX "PriceHistory_cryptoId_idx" ON "PriceHistory"("cryptoId");

-- CreateIndex
CREATE INDEX "PriceHistory_timestamp_idx" ON "PriceHistory"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "PriceHistory_cryptoId_timestamp_key" ON "PriceHistory"("cryptoId", "timestamp");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_portfolioId_idx" ON "Transaction"("portfolioId");

-- CreateIndex
CREATE INDEX "Transaction_cryptoId_idx" ON "Transaction"("cryptoId");

-- CreateIndex
CREATE INDEX "Transaction_walletId_idx" ON "Transaction"("walletId");

-- CreateIndex
CREATE INDEX "UserSettings_userId_idx" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "Wallet"("userId");
