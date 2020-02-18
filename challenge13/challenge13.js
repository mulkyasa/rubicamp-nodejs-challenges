const fs = require('fs');
const readData = () => JSON.parse(fs.readFileSync('data13.json'));
const writeData = (data) => fs.writeFileSync('data13.json', JSON.stringify(data, null, 3));
const args = process.argv;
let data = readData();
let num = parseInt(args[3] - 1);

const help = () => console.log(
    `>>> JS TODO <<<
    $ node todo.js <command>
    $ node todo.js list
    $ node todo.js task <task_id>
    $ node todo.js add <task_content>
    $ node todo.js delete <task_id>
    $ node todo.js complete <task_id>
    $ node todo.js uncomplete <task_id>
    $ node todo.js list:outstanding asc|desc
    $ node todo.js list:completed asc|desc
    $ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
    $ node todo.js filter:<tag_name>`
);

switch (args[2]) {
    case `add`:
        const output = args.slice(3).join(' ');
        data.push({ 'task': output, 'complete': false, 'tag': '', 'tagname': '' });
        writeData(data);
        console.log(`"${output}", telah ditambahkan.`);
        break;
    case `list`:
        console.log('Daftar pekerjaan');
        data.forEach((item, index) => {
            console.log(`${index + 1}. ${item.complete ? '[x]' : '[ ]'} ${item.task}`)
        });
        break;
    case `delete`:
        console.log(`'${data[num].task}' telah dihapus dari daftar`);
        data.splice(num, 1);
        writeData(data);
        break;
    case `complete`:
        const completeTask = num;
        data[completeTask].complete = true;
        data[completeTask].tag = 'x';
        console.log(`'${data[completeTask].task}' telah selesai.`);
        writeData(data);
        break;
    case `uncomplete`:
        const uncompleteTask = num;
        data[uncompleteTask].complete = false;
        data[uncompleteTask].tag = ' ';
        console.log(`'${data[uncompleteTask].task}' status selesai dibatalkan.`);
        writeData(data);
        break;
    case `list:outstanding`:
        console.log('Daftar Pekerjaan');
        if (args[3] == 'desc') {
            for (let i = data.length - 1; i >= 0; i--) {
                if (!data[i].complete) {
                    console.log(`${i + 1}.${data[i].complete ? '[x]' : '[ ]'}${data[i].task}`);
                };
            };
        } else if (args[3] == 'asc') {
            for (let j = 0; j < data.length; j++) {
                if (!data[j].complete) {
                    console.log(`${j + 1}.${data[j].complete ? '[x]' : '[ ]'} ${data[j].task}`);
                };
            };
        };
        break;
    case `list:completed`:
        console.log('Daftar Pekerjaan');
        if (args[3] == 'desc') {
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].complete) {
                    console.log(`${i + 1}.${data[i].complete ? '[x]' : '[ ]'}${data[i].task}`);
                };
            };
        } else if (args[3] == 'asc') {
            for (let j = 0; j < data.length; j++) {
                if (data[j].complete) {
                    console.log(`${j + 1}.${data[j].complete ? '[x]' : '[ ]'} ${data[j].task}`);
                };
            };
        };
        break;
    case 'tag':
        data[num].tag = args.slice(4)
        writeData(data)
        console.log(`Tag '${args.slice(4)}' telah ditambahkan ke daftar '${data[args[3] - 1].task}'.`);
        break;
    case 'filter:':
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < 2; j++) {
                if (args[3] === data[i].tag[j]) {
                    console.log(`${i + 1}. ${data[i].task}`);
                }
            }
        }
        break;
    default:
        help();
        break;
}
