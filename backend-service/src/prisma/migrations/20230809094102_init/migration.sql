-- CreateEnum
CREATE TYPE "statuses" AS ENUM ('DONE', 'IN_PROGRESS', 'TODO');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" "priorities" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "status" "statuses" NOT NULL DEFAULT 'TODO';
