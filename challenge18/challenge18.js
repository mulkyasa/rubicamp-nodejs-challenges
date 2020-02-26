const sqlite3 = require("sqlite3").verbose();
const dbFile = __dirname + "/university.db";
const Table = require('cli-table');

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, err => {
  if (err) throw err;
});

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


login = () => {
  console.log(`===============================================================
Welcome to Universitas Pendidikan Indonesia
Jl. Setiabudhi No. 255
===============================================================`);
  rl.question("username: ", username => {
    console.log(
      "==============================================================="
    );
    rl.question("password: ", password => {
      console.log(
        "==============================================================="
      );
      let sql = `SELECT * FROM login WHERE username = '${username}' AND password = '${password}'`;
      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(
            `Welcome, ${rows.username}. Your access level is: ${rows.access_level}`
          );
          console.log(
            `===============================================================`
          );
          mainMenu();
        } else {
          console.log(
            `Username atau password yang Anda masukkan salah, silahkan coba lagi.`
          );
          login();
        }
      });
    });
  });
};

mainMenu = () => {
  console.log(`Silahkan pilih opsi dibawah ini:
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata kuliah
[5] Kontrak
[6] Keluar
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        mahasiswaMenu();
        break;
      case "2":
        jurusanMenu();
        break;
      case "3":
        dosenMenu();
        break;
      case "4":
        mataKuliahMenu();
        break;
      case "5":
        kontrakMenu();
        break;
      case "6":
        logout();
        break;
      default:
        console.log('Opsi yang Anda pilih salah.');
        mainMenu();
    }
  });
};

mahasiswaMenu = () => {
  console.log(`Silahkan pilih opsi dibawah ini: 
[1] Daftar murid
[2] Cari murid
[3] Tambah murid
[4] Hapus murid
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch(number) {
      case '1':
        mahasiswaList();
        break;
      case '2':
        mahasiswaSearch();
        break;
      case '3':
        mahasiswaAdd();
        break;
      case '4':
        mahasiswaRemove();
        break;
      case '5':
        back();
        break;
      default:
        console.log('Opsi yang Anda pilih salah.')
        mahasiswaMenu();
    };
  });
};

mahasiswaList = () => {
  let sql = `SELECT * FROM login`;
  let table = new Table({
    head: ['NIM', 'Nama', 'Alamat', 'Jurusan'],
    colWidths: [40, 40]
  });
};

login();