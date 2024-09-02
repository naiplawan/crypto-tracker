/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `Wallet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "address" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");
