function stringManipulation(word) {
  var vowel = "aiueo";
  var newWord;

  if (vowel.includes(word[0])) {
    return word;
  } else {
    newWord = word.slice(1, word.length).concat(word[0], 'nyo');
    return newWord;
  }
}

function sentenceManipulation(sentence) {
  var word = sentence.split(" ");
  var hasil = [];

  for (let i = 0; i < word.length; i++) {
    hasil.push(stringManipulation(word[i]))
  }
  return hasil.join(" ");
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'tulis kalimatmu disini > '
});

rl.prompt();

rl.on('line', (answer) => {
  console.log(`hasil konversi > '${sentenceManipulation(answer)}'`);
  rl.prompt();
}).on('close', () => {
  console.log('Good bye!');
  process.exit(0);
});