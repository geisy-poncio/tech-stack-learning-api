/*
  Warnings:

  - You are about to drop the column `idDeleted` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `idDeleted` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "idDeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "idDeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
