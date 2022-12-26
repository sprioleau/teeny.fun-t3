/*
  Warnings:

  - A unique constraint covering the columns `[teenyCode]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_teenyCode_key" ON "Url"("teenyCode");
