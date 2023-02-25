/*
  Warnings:

  - You are about to drop the column `user_id` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_user_id_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "user_id";
