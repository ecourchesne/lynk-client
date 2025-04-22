/*
  Warnings:

  - You are about to drop the column `accountActivationKey` on the `company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `personalclient` DROP FOREIGN KEY `PersonalClient_decoderId_fkey`;

-- DropIndex
DROP INDEX `Company_accountActivationKey_idx` ON `company`;

-- DropIndex
DROP INDEX `Company_accountActivationKey_key` ON `company`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `accountActivationKey`;

-- AlterTable
ALTER TABLE `personalclient` MODIFY `decoderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PersonalClient` ADD CONSTRAINT `PersonalClient_decoderId_fkey` FOREIGN KEY (`decoderId`) REFERENCES `Decoder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
