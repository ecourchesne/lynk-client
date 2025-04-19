/*
  Warnings:

  - The primary key for the `Decoder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Decoder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `decoderId` on the `PersonalClient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `SubscriptionItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `SubscriptionItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `decoderId` on the `SubscriptionItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `PersonalClient` DROP FOREIGN KEY `PersonalClient_decoderId_fkey`;

-- DropForeignKey
ALTER TABLE `SubscriptionItem` DROP FOREIGN KEY `SubscriptionItem_decoderId_fkey`;

-- AlterTable
ALTER TABLE `Decoder` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PersonalClient` MODIFY `decoderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SubscriptionItem` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `decoderId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `PersonalClient` ADD CONSTRAINT `PersonalClient_decoderId_fkey` FOREIGN KEY (`decoderId`) REFERENCES `Decoder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionItem` ADD CONSTRAINT `SubscriptionItem_decoderId_fkey` FOREIGN KEY (`decoderId`) REFERENCES `Decoder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
