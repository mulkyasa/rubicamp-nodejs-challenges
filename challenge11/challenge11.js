const fs = require('fs');
let rawdata = fs.readFileSync('data11.json');
let obj = JSON.parse(rawdata);
let num = 0;

console.log(`Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yg benar ya!`);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Tebakan: "
});

console.log(`Pertanyaan: ${obj[0].quest}`);

rl.prompt();

rl.on('line', (line) => {
  if (line.trim() === obj[num].ans) {
    console.log("Selamat Anda Benar!");
    num++;
    if (num === obj.length) {
      console.log("Hore Anda Menang!");
      rl.close();
    } else {
      console.log(obj[num].quest);
      rl.prompt();
    }
  } else {
      console.log("Wkwkwk, Anda Kurang Beruntung");
      rl.prompt();
    }
  rl.prompt();
}).on("close", () => {
  process.exit(0);
});