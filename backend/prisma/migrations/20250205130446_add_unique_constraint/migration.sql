/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,name]` on the table `Sensor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Project_userId_name_key` ON `Project`(`userId`, `name`);

-- CreateIndex
CREATE UNIQUE INDEX `Sensor_projectId_name_key` ON `Sensor`(`projectId`, `name`);
