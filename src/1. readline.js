const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('node', (answer) => {
    console.log(`log: ${answer}`)
})

rl.on('line', (input) => {
    console.log(`line: ${input}`)

    if (input === 'exit') {
        rl.close()
    }
})

rl.on('SIGINT', () => {
    rl.question('确定退出？', (answer) => {
        if (answer.match(/^y(es)?$/i)) {
            rl.pause()
        }
    })
})