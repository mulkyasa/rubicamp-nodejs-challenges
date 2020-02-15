const fs = require('fs');
const readData = () => JSON.parse(fs.readFileSync('data13.json'));
const writeData = (data) => fs.writeFileSync('data13.json', JSON.stringify(data, null, 3));
const args = process.argv;
let data = readData();

console.log(
    `
    >>> JS TODO <<<
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
    $ node todo.js filter:<tag_name>
    `
);

switch (args[2]) {
    case `add`:
        const output = args.slice(3).join(' ');
        data.push({'task': output, 'complete': false, 'tag': '', 'tagname': ''});
        writeData(data);
        console.log(`"${output}", telah ditambahkan.`);
        break;
    case `list`:
        console.log('Daftar pekerjaan');
        data.forEach((item, index) => {
            console.log(`${index + 1}. [ ] ${item.task}`)
        });
        break;
    default:

        break;
}
