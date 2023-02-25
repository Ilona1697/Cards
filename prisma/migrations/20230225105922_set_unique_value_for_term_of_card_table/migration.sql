/*
  Warnings:

  - A unique constraint covering the columns `[term]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_term_key" ON "Card"("term");
