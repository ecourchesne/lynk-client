/*
  Warnings:

  - Added the required column `companyId` to the `CommercialClient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CommercialClient` ADD COLUMN `companyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Decoder` ADD COLUMN `companyId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountActivationKey` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Company_accountActivationKey_key`(`accountActivationKey`),
    INDEX `Company_accountActivationKey_idx`(`accountActivationKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CommercialClient_companyId_idx` ON `CommercialClient`(`companyId`);

-- AddForeignKey
ALTER TABLE `CommercialClient` ADD CONSTRAINT `CommercialClient_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Decoder` ADD CONSTRAINT `Decoder_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
