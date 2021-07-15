-- DropIndex
DROP INDEX `tagList` ON `Articles`;

-- CreateTable
CREATE TABLE `Follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower` VARCHAR(191) NOT NULL,
    `followee` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follow` ADD FOREIGN KEY (`follower`) REFERENCES `Users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
