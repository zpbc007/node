// import test from 'ava'

// test('test', async t => {
//     t.plan(1)
    
//     await getArgFromCommand((data) => {
//         console.log(`接收到数据 ${data}`)
//     })
    
//     t.pass()
// })


// function getArgFromCommand (callback) {
//     process.stdin.setEncoding('utf8')
//     return new Promise((resolve, reject) => {
//         process.stdin.on('readable', () => {
//             const chunk = process.stdin.read()
//             if (chunk !== null) {
//                 callback(chunk)
//                 process.stdout.write(`data: ${chunk}`)
//             }
//         })
        
//         process.stdin.on('end', () => {
//             resolve()
//             process.stdout.write('end')
//         })

//     })
// }

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk !== null) {
        // callback(chunk)
        if (chunk === '.exit') {
            process.exit(1)
        }
        process.stdout.write(`data: ${chunk}`)
    }
})

process.stdin.on('end', () => {
    resolve()
    process.stdout.write('end')
})
