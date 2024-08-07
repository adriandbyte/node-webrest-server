-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "completed" TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
