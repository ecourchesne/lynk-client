/*
  Warnings:

  - A unique constraint covering the columns `[decoderId]` on the table `PersonalClient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Decoder` (
    `id` VARCHAR(191) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `state` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Decoder_state_idx`(`state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionItem` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `decoderId` VARCHAR(191) NOT NULL,

    INDEX `SubscriptionItem_type_idx`(`type`),
    INDEX `SubscriptionItem_decoderId_idx`(`decoderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PersonalClient_decoderId_key` ON `PersonalClient`(`decoderId`);

-- AddForeignKey
ALTER TABLE `PersonalClient` ADD CONSTRAINT `PersonalClient_decoderId_fkey` FOREIGN KEY (`decoderId`) REFERENCES `Decoder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionItem` ADD CONSTRAINT `SubscriptionItem_decoderId_fkey` FOREIGN KEY (`decoderId`) REFERENCES `Decoder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
