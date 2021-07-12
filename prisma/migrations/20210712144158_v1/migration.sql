-- CreateTable
CREATE TABLE `Users` (
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `following` INTEGER NOT NULL,
    `followers` INTEGER NOT NULL,
    `resetPasswordToken` VARCHAR(191),
    `resetPasswordExpirationDate` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users.email_unique`(`email`),
    UNIQUE INDEX `Users.username_unique`(`username`),
    UNIQUE INDEX `Users.resetPasswordToken_unique`(`resetPasswordToken`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles` (
    `article_id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `body` TEXT NOT NULL,
    `tagList` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `favoritesCount` INTEGER NOT NULL,

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles_Favourited` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Articles_Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `tags_id` VARCHAR(191) NOT NULL,
    `tag_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tags.tag_name_unique`(`tag_name`),
    PRIMARY KEY (`tags_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Articles` ADD FOREIGN KEY (`tagList`) REFERENCES `Tags`(`tag_name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles` ADD FOREIGN KEY (`author`) REFERENCES `Users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles_Favourited` ADD FOREIGN KEY (`article_id`) REFERENCES `Articles`(`article_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles_Favourited` ADD FOREIGN KEY (`username`) REFERENCES `Users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles_Comments` ADD FOREIGN KEY (`article_id`) REFERENCES `Articles`(`article_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Articles_Comments` ADD FOREIGN KEY (`username`) REFERENCES `Users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
