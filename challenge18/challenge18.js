const sqlite3 = require("sqlite3").verbose();
const dbFile = __dirname + "/university.db";
const Table = require("cli-table");

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
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini:
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
        matkulMenu();
        break;
      case "5":
        kontrakMenu();
        break;
      case "6":
        logout();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        mainMenu();
    }
  });
};

mahasiswaMenu = () => {
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini: 
[1] Daftar murid
[2] Cari murid
[3] Tambah murid
[4] Hapus murid
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        mahasiswaList();
        break;
      case "2":
        mahasiswaSearch();
        break;
      case "3":
        mahasiswaAdd();
        break;
      case "4":
        mahasiswaRemove();
        break;
      case "5":
        mahasiswaBack();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        mahasiswaMenu();
    }
  });
};

mahasiswaList = () => {
  let sql = `SELECT * FROM mahasiswa`;

  db.all(sql, (err, rows) => {
    if (err) throw err;

    if (rows) {
      let table = new Table({
        head: ["NIM", "Nama", "Alamat", "Jurusan"],
        colWidths: [10, 20, 10, 10]
      });
      rows.forEach(item => {
        table.push([
          `${item.nim}`,
          `${item.nama_mahasiswa}`,
          `${item.alamat}`,
          `${item.id_jurusan}`
        ]);
      });
      console.log(table.toString());
      mahasiswaMenu();
    }
  });
};

mahasiswaSearch = () => {
  rl.question(
    `===============================================================
Masukkan NIM: `,
    nim => {
      let sql = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;

      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(`===============================================================
Student details
===============================================================
id      : ${rows.nim}
nama    : ${rows.nama_mahasiswa}
alamat  : ${rows.alamat}
jurusan : ${rows.id_jurusan}`);
        } else {
          console.log(`Mahasiswa dengan nim ${nim} tidak terdaftar`);
        }
        mahasiswaMenu();
      });
    }
  );
};

mahasiswaAdd = () => {
  rl.question(
    `===============================================================
Lengkapi data dibawah ini:
NIM : `,
    nim => {
      rl.question(`Nama : `, nama => {
        rl.question(`Jurusan : `, jurusan => {
          rl.question(`Alamat : `, alamat => {
            let sql = `INSERT INTO mahasiswa (nim, nama_mahasiswa, alamat, id_jurusan)
VALUES ('${nim}', '${nama}', '${jurusan}', '${alamat}')`;

            db.run(sql, (err, rows) => {
              if (err) throw err;

              mahasiswaList();
            });
          });
        });
      });
    }
  );
};

mahasiswaRemove = () => {
  rl.question(
    `===============================================================
Masukkan nim mahasiswa yang akan dihapus : `,
    nim => {
      let sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;

      db.run(sql, (err) => {
        if (err) throw err;

        mahasiswaList();
      });
    }
  );
};

mahasiswaBack = () => {
  mainMenu();
};

jurusanMenu = () => {
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini: 
[1] Daftar jurusan
[2] Cari jurusan
[3] Tambah jurusan
[4] Hapus jurusan
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        jurusanList();
        break;
      case "2":
        jurusanSearch();
        break;
      case "3":
        jurusanAdd();
        break;
      case "4":
        jurusanRemove();
        break;
      case "5":
        jurusanBack();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        jurusanMenu();
    }
  });
};

jurusanList = () => {
  let sql = `SELECT * FROM jurusan`;

  db.all(sql, (err, rows) => {
    if (err) throw err;

    if (rows) {
      let table = new Table({
        head: ["ID", "Nama Jurusan"],
        colWidths: [10, 20]
      });
      rows.forEach(item => {
        table.push([`${item.id_jurusan}`, `${item.nama_jurusan}`]);
      });
      console.log(table.toString());
      jurusanMenu();
    }
  });
};

jurusanSearch = () => {
  rl.question(
    `===============================================================
Masukkan ID: `,
    id => {
      let sql = `SELECT * FROM jurusan WHERE id_jurusan = '${id}'`;

      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(`===============================================================
Major details
===============================================================
Id            : ${rows.id_jurusan}
Nama jurusan  : ${rows.nama_jurusan}`);
        } else {
          console.log(`jurusan dengan nim ${id} tidak terdaftar`);
        }
        jurusanMenu();
      });
    }
  );
};

jurusanAdd = () => {
  rl.question(
    `===============================================================
Lengkapi data dibawah ini:
ID : `,
    id => {
      rl.question(`Jurusan : `, jurusan => {
        let sql = `INSERT INTO jurusan (nim, nama_jurusan, alamat, id_jurusan)
VALUES ('${id}', '${jurusan}')`;

        db.run(sql, err => {
          if (err) throw err;

          jurusanList();
        });
      });
    }
  );
};

jurusanRemove = () => {
  rl.question(
    `===============================================================
Masukkan id jurusan yang akan dihapus : `,
    id => {
      let sql = `DELETE FROM jurusan WHERE id_jurusan = ${id}`;

      db.run(sql, err => {
        if (err) throw err;

        jurusanList();
      });
    }
  );
};

jurusanBack = () => {
  mainMenu();
};

dosenMenu = () => {
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini: 
[1] Daftar dosen
[2] Cari dosen
[3] Tambah dosen
[4] Hapus dosen
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        dosenList();
        break;
      case "2":
        dosenSearch();
        break;
      case "3":
        dosenAdd();
        break;
      case "4":
        dosenRemove();
        break;
      case "5":
        dosenBack();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        dosenMenu();
    }
  });
};

dosenList = () => {
  let sql = `SELECT * FROM dosen`;

  db.all(sql, (err, rows) => {
    if (err) throw err;

    if (rows) {
      let table = new Table({
        head: ["nip", "Nama"],
        colWidths: [10, 20]
      });
      rows.forEach(item => {
        table.push([`${item.nip}`, `${item.nama_dosen}`]);
      });
      console.log(table.toString());
      dosenMenu();
    }
  });
};

dosenSearch = () => {
  rl.question(
    `===============================================================
Masukkan NIP: `,
    nip => {
      let sql = `SELECT * FROM dosen WHERE nip = '${nip}'`;

      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(`===============================================================
Teacher details
===============================================================
id      : ${rows.nip}
nama    : ${rows.nama_dosen}`);
        } else {
          console.log(`Dosen dengan nip ${nip} tidak terdaftar`);
        }
        dosenMenu();
      });
    }
  );
};

dosenAdd = () => {
  rl.question(
    `===============================================================
Lengkapi data dibawah ini:
NIP : `,
    nip => {
      rl.question(`Nama : `, nama => {
        rl.question(`Jurusan : `, jurusan => {
          let sql = `INSERT INTO dosen (nip, nama_dosen, alamat, id_jurusan)
VALUES ('${nip}', '${nama}', '${jurusan}', '${alamat}')`;

          db.run(sql, (err) => {
            if (err) throw err;

            dosenList();
          });
        });
      });
    }
  );
};

dosenRemove = () => {
  rl.question(
    `===============================================================
Masukkan NIP dosen yang akan dihapus : `,
    nip => {
      let sql = `DELETE FROM dosen WHERE nip = ${nip}`;

      db.run(sql, (err) => {
        if (err) throw err;

        dosenList();
      });
    }
  );
};

dosenBack = () => {
  mainMenu();
};

matkulMenu = () => {
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini: 
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        matkulList();
        break;
      case "2":
        matkulSearch();
        break;
      case "3":
        matkulAdd();
        break;
      case "4":
        matkulRemove();
        break;
      case "5":
        matkulBack();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        matkulMenu();
    }
  });
};

matkulList = () => {
  let sql = `SELECT * FROM mata_kuliah`;

  db.all(sql, (err, rows) => {
    if (err) throw err;

    if (rows) {
      let table = new Table({
        head: ["ID", "Nama Mata Kuliah", "SKS"],
        colWidths: [10, 20, 10]
      });
      rows.forEach(item => {
        table.push([
          `${item.id_matakuliah}`,
          `${item.nama_matakuliah}`,
          `${item.sks}`
        ]);
      });
      console.log(table.toString());
      matkulMenu();
    }
  });
};

matkulSearch = () => {
  rl.question(
    `===============================================================
Masukkan ID: `,
    id => {
      let sql = `SELECT * FROM mata_kuliah WHERE id_matakuliah = '${id}'`;

      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(`===============================================================
Course details
===============================================================
ID                : ${rows.id_matakuliah}
Nama Mata Kuliah  : ${rows.nama_matakuliah}
sks               : ${rows.sks}`);
        } else {
          console.log(`Mata kuliah dengan id ${id} tidak terdaftar.`);
        }
        matkulMenu();
      });
    }
  );
};

matkulAdd = () => {
  rl.question(
    `===============================================================
Lengkapi data dibawah ini:
ID : `,
    id => {
      rl.question(`Nama mata kuliah : `, matkul => {
        rl.question(`SKS : `, sks => {
          let sql = `INSERT INTO mata_kuliah (id_matakuliah, nama_matakuliah, sks)
VALUES ('${id}', '${matkul}', '${sks}')`;

          db.run(sql, err => {
            if (err) throw err;

            matkulList();
          });
        });
      });
    }
  );
};

matkulRemove = () => {
  rl.question(
    `===============================================================
Masukkan ID mata kuliah yang akan dihapus : `,
    id => {
      let sql = `DELETE FROM mata_kuliah WHERE id = ${id}`;

      db.run(sql, err => {
        if (err) throw err;

        matkulList();
      });
    }
  );
};

matkulBack = () => {
  mainMenu();
};

kontrakMenu = () => {
  console.log(`===============================================================
Silahkan pilih opsi dibawah ini: 
[1] Daftar kontrak
[2] Cari kontrak
[3] Tambah kontrak
[4] Hapus kontrak
[5] Kembali
===============================================================`);

  rl.question(`Masukkan salah satu nomor dari opsi diatas: `, number => {
    switch (number) {
      case "1":
        kontrakList();
        break;
      case "2":
        kontrakSearch();
        break;
      case "3":
        kontrakAdd();
        break;
      case "4":
        kontrakRemove();
        break;
      case "5":
        kontrakBack();
        break;
      default:
        console.log("Opsi yang Anda pilih salah.");
        kontrakMenu();
    }
  });
};

kontrakList = () => {
  let sql = `SELECT * FROM kontrak`;

  db.all(sql, (err, rows) => {
    if (err) throw err;

    if (rows) {
      let table = new Table({
        head: ["ID Kontrak", "NIM", "ID Mata Kuliah", "NIP", "Nilai"],
        colWidths: [10, 10, 10, 10, 10]
      });
      rows.forEach(item => {
        table.push([
          `${item.id_kontrak}`,
          `${item.nim}`,
          `${item.id_matakuliah}`,
          `${item.nip}`,
          `${item.nilai}`
        ]);
      });
      console.log(table.toString());
      kontrakMenu();
    }
  });
};

kontrakSearch = () => {
  rl.question(
    `===============================================================
Masukkan ID Kontrak: `,
    idKontrak => {
      let sql = `SELECT * FROM kontrak WHERE id_kontrak = '${idKontrak}'`;

      db.get(sql, (err, rows) => {
        if (err) throw err;

        if (rows) {
          console.log(`===============================================================
Contract details
===============================================================
ID Kontrak    : ${rows.id_kontrak}
NIM           : ${rows.nim}
ID Mata Kuliah: ${rows.id_matakuliah}
NIP           : ${rows.nip}
Nilai         : ${rows.nilai}`);
        } else {
          console.log(
            `Kontrak dengan id kontrak ${idKontrak} tidak terdaftar.`
          );
        }
        kontrakMenu();
      });
    }
  );
};

kontrakAdd = () => {
  rl.question(
    `===============================================================
Lengkapi data dibawah ini:
ID Kontrak : `,
    idKontrak => {
      rl.question(`NIM : `, nim => {
        rl.question(`ID Mata Kuliah : `, idMataKuliah => {
          rl.question(`NIP : `, nip => {
            rl.question(`Nilai : `, nilai => {
              let sql = `INSERT INTO kontrak (id_kontrak, nim, id_matakuliah, nip, nilai)
VALUES ('${idKontrak}', '${nim}', '${idMataKuliah}', '${nip}', '${nilai}')`;

              db.run(sql, (err) => {
                if (err) throw err;

                kontrakList();
              });
            });
          });
        });
      });
    }
  );
};

kontrakRemove = () => {
  rl.question(
    `===============================================================
Masukkan ID Kontrak yang akan dihapus : `,
    idKontrak => {
      let sql = `DELETE FROM kontrak WHERE id_kontrak = ${idKontrak}`;

      db.run(sql, (err) => {
        if (err) throw err;

        kontrakList();
      });
    }
  );
};

kontrakBack = () => {
  mainMenu();
};

logout = () => {
  login();
};

login();
