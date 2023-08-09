/*
  Warnings:

  - A unique constraint covering the columns `[names]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_names_key" ON "users"("names");
