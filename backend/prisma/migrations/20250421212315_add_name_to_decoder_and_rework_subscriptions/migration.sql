-- DropForeignKey
ALTER TABLE `subscriptionitem` DROP FOREIGN KEY `SubscriptionItem_decoderId_fkey`;

-- AlterTable
ALTER TABLE `decoder` ADD COLUMN `lastReinitializedAt` DATETIME(3) NULL,
    ADD COLUMN `lastRestartedAt` DATETIME(3) NULL,
    ADD COLUMN `name` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `_DecoderSubscriptions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DecoderSubscriptions_AB_unique`(`A`, `B`),
    INDEX `_DecoderSubscriptions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DecoderSubscriptions` ADD CONSTRAINT `_DecoderSubscriptions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Decoder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DecoderSubscriptions` ADD CONSTRAINT `_DecoderSubscriptions_B_fkey` FOREIGN KEY (`B`) REFERENCES `SubscriptionItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
