-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "Psychologist" DROP CONSTRAINT "Psychologist_userId_fkey";

-- DropForeignKey
ALTER TABLE "PsychologistFiles" DROP CONSTRAINT "PsychologistFiles_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_testId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_testId_fkey";

-- DropForeignKey
ALTER TABLE "UserTest" DROP CONSTRAINT "UserTest_resultId_fkey";

-- DropForeignKey
ALTER TABLE "UserTest" DROP CONSTRAINT "UserTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "UserTest" DROP CONSTRAINT "UserTest_userId_fkey";

-- AddForeignKey
ALTER TABLE "Psychologist" ADD CONSTRAINT "Psychologist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsychologistFiles" ADD CONSTRAINT "PsychologistFiles_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTest" ADD CONSTRAINT "UserTest_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
