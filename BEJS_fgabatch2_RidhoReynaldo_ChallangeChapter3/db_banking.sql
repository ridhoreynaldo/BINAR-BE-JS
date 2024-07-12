--DDL
CREATE TABLE tb_nasabah(
--id UUID PRIMARY KEY DEFAULT gen_random_uuid(),--uuid
id SERIAL PRIMARY KEY,
nama VARCHAR(50) NOT NULL,
no_telp VARCHAR(15) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
alamat VARCHAR(50) NOT NULL,
tgl_lahir DATE NOT NULL
);

CREATE TABLE tb_akun_tipe(
id SERIAL PRIMARY KEY,
tipe_akun VARCHAR(50) NOT NULL
);

CREATE TABLE tb_akun(
id SERIAL PRIMARY KEY,
id_nasabah INT NOT NULL,
id_tipe_akun INT NOT NULL,
no_akun VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(50) NOT NULL,
saldo decimal NOT NULL,
FOREIGN KEY(id_nasabah) REFERENCES tb_nasabah(id),
FOREIGN KEY(id_tipe_akun) REFERENCES tb_akun_tipe(id)
);

CREATE TABLE tb_transaksi_tipe(
id SERIAL PRIMARY KEY,
tipe_transaksi VARCHAR(50) NOT NULL
);

CREATE TABLE tb_transaksi(
id SERIAL PRIMARY KEY,
id_akun INT NOT NULL,
tgl_transaksi TIMESTAMP DEFAULT now(),
jumlah DECIMAL NOT NULL,
id_tipe_transaksi INT NOT NULL,
FOREIGN KEY(id_akun) REFERENCES tb_akun(id),
FOREIGN KEY(id_tipe_transaksi) REFERENCES tb_transaksi_tipe(id)
);

--DATABASE INDEXING
create index idx_tb_akun_no_akun on tb_akun(no_akun);
create index idx_tb_akun_saldo on tb_akun(saldo);

--DML
--INSERT TIPE AKUN dan TIPE TRANSAKSI
INSERT INTO tb_akun_tipe(tipe_akun) VALUES
('Silver'),
('Gold');

INSERT INTO tb_transaksi_tipe(tipe_transaksi) VALUES
('Setor'),
('Tarik');

--CRUD NASABAH
INSERT INTO tb_nasabah (nama, no_telp, email, alamat, tgl_lahir) VALUES
('Ridho', '123', 'ridho@gmail.com', 'Medan Barat', '1998-11-13'),
('Ridha', '456', 'ridha@yahoo.com', 'Tanjung Balai', '2001-11-23'),
('John', '000', 'john@mail.com', 'USA', '1980-11-23'); --DIHAPUS DI QUERY BAWAH

UPDATE tb_nasabah SET alamat='Medan Maimun' WHERE id=1;

DELETE FROM tb_nasabah WHERE id=3;

SELECT * FROM tb_nasabah;

--CRUD AKUN
INSERT INTO tb_akun (id_nasabah, id_tipe_akun, no_akun, password, saldo) VALUES
(1, 1, '123', MD5('123'), 50000),
(1, 2, '321', MD5('321'), 50000),
(2, 1, '456', MD5('456'), 50000), -- DIUPDATE DIBAWAH
(2, 2, '654', MD5('654'), 50000); -- DIDELETE DIBAWAH

UPDATE tb_akun SET password=MD5('123') WHERE id=3;

DELETE FROM tb_akun WHERE id=4;

SELECT * FROM tb_akun;

--CRUD TRANSAKSI
INSERT INTO tb_transaksi (id_akun, jumlah, id_tipe_transaksi) VALUES
(1, 123, 1),
(1, 123, 2),
(2, 123, 1),
(2, 123, 2),
(3, 123, 1),--delete
(3, 123, 2);--update

UPDATE tb_transaksi SET jumlah=456 WHERE id=6;

DELETE FROM tb_transaksi WHERE id=5;

SELECT * FROM tb_transaksi;

--JOIN
--LIHAT DATA TRANSAKSI dari akun 123
SELECT A.no_akun, A.saldo, B.tgl_transaksi, B.jumlah, C.tipe_transaksi, B.id_tipe_transaksi 
FROM tb_akun AS A
JOIN tb_transaksi AS B ON A.id=B.id_akun
JOIN tb_transaksi_tipe AS C ON B.id_tipe_transaksi=C.id where A.no_akun = '123';

--LIHAT SEMUA DATA
SELECT A.no_akun, A.saldo, B.tgl_transaksi, B.jumlah, C.tipe_transaksi
FROM tb_akun AS A
JOIN tb_transaksi AS B ON A.id=B.id_akun
JOIN tb_transaksi_tipe AS C ON B.id_tipe_transaksi=C.id;