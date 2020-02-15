const fs = require('fs');
let rawData = fs.readFileSync('data12.json');
let obj = JSON.parse(rawData);
let num = 0;
let wrong = 0;

if (process.argv[2] === 'data12.json') {
  console.log(`Selamat datang di permainan tebak-tebakan. Kamu akan diberikan pertanyan dari file ini 'data12.json'.
  Untuk bermain, jawablah dengan jawaban yang sesuai.`);

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
    } else if (line === `skip`) {
      obj.push(obj[num])
      num++;
      console.log(`Pertanyaan: ${obj[num].quest}`);
    } else {
      wrong++;
      console.log(`Anda kurang beruntung! Anda telah salah ${wrong} kali, silahkan coba lagi.`);
      rl.prompt();
    }
    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
} else {
  console.log(`Tolong sertakan nama file sebagai inputan soalnya.
  Misalnya 'node challenge12.js data12.json'.`)
}