-- CreateTable
CREATE TABLE "Nasabah" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Nasabah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "nasabahId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAkun" (
    "id" TEXT NOT NULL,
    "nasabahId" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "BankAkun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" TEXT NOT NULL,
    "bankAkunId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_email_key" ON "Nasabah"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_nasabahId_key" ON "Profile"("nasabahId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAkun_accountNo_key" ON "BankAkun"("accountNo");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_nasabahId_fkey" FOREIGN KEY ("nasabahId") REFERENCES "Nasabah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAkun" ADD CONSTRAINT "BankAkun_nasabahId_fkey" FOREIGN KEY ("nasabahId") REFERENCES "Nasabah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_bankAkunId_fkey" FOREIGN KEY ("bankAkunId") REFERENCES "BankAkun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
