/*
  Warnings:

  - You are about to alter the column `completedAt` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `completedAt` TIMESTAMP NULL;
