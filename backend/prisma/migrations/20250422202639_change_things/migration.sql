/*
  Warnings:

  - You are about to drop the column `decoderId` on the `subscriptionitem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `SubscriptionItem_decoderId_idx` ON `subscriptionitem`;

-- AlterTable
ALTER TABLE `subscriptionitem` DROP COLUMN `decoderId`;
