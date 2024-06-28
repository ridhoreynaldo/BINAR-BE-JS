let saldo = 0;

function tambahSaldo() {
    let jumlah = parseFloat(window.prompt("Masukkan jumlah yang ingin ditambahkan:"));
    if (!isNaN(jumlah) && jumlah > 0) {
        saldo += jumlah;
        alert("Saldo berhasil ditambahkan. Saldo saat ini: " + saldo);
    } else {
        alert("Input tidak valid. Silakan masukkan jumlah yang benar.");
    }
}

function kurangiSaldo() {
    let jumlah = parseFloat(window.prompt("Masukkan jumlah yang ingin dikurangi:"));
    if (!isNaN(jumlah) && jumlah > 0) {
        if (saldo >= jumlah) {
            saldo -= jumlah;
            alert("Saldo berhasil dikurangi. Saldo saat ini: " + saldo);
        } else {
            alert("Saldo tidak mencukupi. Saldo saat ini: " + saldo);
        }
    } else {
        alert("Input tidak valid. Silakan masukkan jumlah yang benar.");
    }
}

tambahSaldo();
kurangiSaldo();
