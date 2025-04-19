/*
  Warnings:

  - The primary key for the `CommercialClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `CommercialClient` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CommercialClient` table. All the data in the column will be lost.
  - The primary key for the `PersonalClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PersonalClient` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `CommercialClient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `PersonalClient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CommercialClient` DROP FOREIGN KEY `CommercialClient_id_fkey`;

-- DropForeignKey
ALTER TABLE `PersonalClient` DROP FOREIGN KEY `PersonalClient_id_fkey`;

-- DropIndex
DROP INDEX `CommercialClient_companyId_idx` ON `CommercialClient`;

-- AlterTable
ALTER TABLE `CommercialClient` DROP PRIMARY KEY,
    DROP COLUMN `companyId`,
    DROP COLUMN `id`,
    ADD COLUMN `clientId` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`clientId`);

-- AlterTable
ALTER TABLE `PersonalClient` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`clientId`);

-- CreateIndex
CREATE INDEX `CommercialClient_clientId_idx` ON `CommercialClient`(`clientId`);

-- AddForeignKey
ALTER TABLE `CommercialClient` ADD CONSTRAINT `CommercialClient_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalClient` ADD CONSTRAINT `PersonalClient_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
