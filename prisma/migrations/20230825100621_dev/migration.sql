-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "groupedQuestionId" TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_groupedQuestionId_fkey" FOREIGN KEY ("groupedQuestionId") REFERENCES "GroupedQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
