/*
  Warnings:

  - You are about to drop the column `code_points` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `long_url` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `short_url` on the `Url` table. All the data in the column will be lost.
  - Added the required column `codePoints` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortUrl` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teenyCode` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "code_points",
DROP COLUMN "long_url",
DROP COLUMN "short_url",
ADD COLUMN     "codePoints" TEXT NOT NULL,
ADD COLUMN     "longUrl" TEXT NOT NULL,
ADD COLUMN     "shortUrl" TEXT NOT NULL,
ADD COLUMN     "teenyCode" TEXT NOT NULL;
