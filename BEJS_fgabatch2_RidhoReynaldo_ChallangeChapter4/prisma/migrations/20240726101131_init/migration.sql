-- CreateTable
CREATE TABLE "tb_nasabah" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tgl_lahir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_nasabah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_akun" (
    "id" TEXT NOT NULL,
    "id_nasabah" TEXT NOT NULL,
    "tipe_akun" TEXT NOT NULL,
    "no_akun" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0.00,

    CONSTRAINT "tb_akun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_transaksi" (
    "id" TEXT NOT NULL,
    "id_akun" TEXT NOT NULL,
    "tgl_transaksi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlah" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "tipe_transaksi" TEXT NOT NULL,

    CONSTRAINT "tb_transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_nasabah_email_key" ON "tb_nasabah"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_akun_no_akun_key" ON "tb_akun"("no_akun");

-- AddForeignKey
ALTER TABLE "tb_akun" ADD CONSTRAINT "tb_akun_id_nasabah_fkey" FOREIGN KEY ("id_nasabah") REFERENCES "tb_nasabah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaksi" ADD CONSTRAINT "tb_transaksi_id_akun_fkey" FOREIGN KEY ("id_akun") REFERENCES "tb_akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
