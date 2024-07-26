/*
  Warnings:

  - You are about to drop the `tb_akun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_nasabah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_transaksi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_akun" DROP CONSTRAINT "tb_akun_id_nasabah_fkey";

-- DropForeignKey
ALTER TABLE "tb_transaksi" DROP CONSTRAINT "tb_transaksi_id_akun_fkey";

-- DropTable
DROP TABLE "tb_akun";

-- DropTable
DROP TABLE "tb_nasabah";

-- DropTable
DROP TABLE "tb_transaksi";

-- CreateTable
CREATE TABLE "Nasabah" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tgl_lahir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nasabah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Akun" (
    "id" TEXT NOT NULL,
    "id_nasabah" TEXT NOT NULL,
    "tipe_akun" TEXT NOT NULL,
    "no_akun" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0.00,

    CONSTRAINT "Akun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" TEXT NOT NULL,
    "id_akun" TEXT NOT NULL,
    "tgl_transaksi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlah" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "tipe_transaksi" TEXT NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_email_key" ON "Nasabah"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Akun_no_akun_key" ON "Akun"("no_akun");

-- AddForeignKey
ALTER TABLE "Akun" ADD CONSTRAINT "Akun_id_nasabah_fkey" FOREIGN KEY ("id_nasabah") REFERENCES "Nasabah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_akun_fkey" FOREIGN KEY ("id_akun") REFERENCES "Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
