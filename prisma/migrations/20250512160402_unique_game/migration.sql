/*
  Warnings:

  - A unique constraint covering the columns `[name,publisherId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Game_name_publisherId_key" ON "Game"("name", "publisherId");
