/*
  Warnings:

  - A unique constraint covering the columns `[follower,followee]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Follow.follower_followee_unique` ON `Follow`(`follower`, `followee`);
