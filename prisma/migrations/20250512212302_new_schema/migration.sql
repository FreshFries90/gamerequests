/*
  Warnings:

  - You are about to drop the column `email` on the `Publisher` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Publisher_email_key";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "salutation" SET DEFAULT 'Keine Angabe',
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "formOfAddress" SET DEFAULT 'Förmlich',
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "language" SET DEFAULT 'Englisch';

-- AlterTable
ALTER TABLE "Publisher" DROP COLUMN "email";
