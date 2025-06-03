/*
  Warnings:

  - A unique constraint covering the columns `[registerNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `batch` INTEGER NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `registerNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_registerNumber_key` ON `User`(`registerNumber`);
