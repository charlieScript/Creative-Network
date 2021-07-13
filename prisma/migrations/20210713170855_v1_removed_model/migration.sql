/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Articles` DROP FOREIGN KEY `Articles_ibfk_1`;

-- DropTable
DROP TABLE `Tags`;
