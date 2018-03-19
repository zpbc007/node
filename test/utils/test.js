import test from 'ava'
import fs from 'fs'
import path from 'path'
import { readLine, readFile, ReadStrObj } from '../../util/util'

const filePath = path.join(__dirname, '../../resource/tinyG.txt')

test.serial('readFile test', async t => {
    t.plan(1)
    const data = await readFile(filePath)
    console.log(`readFile ==> ${data}`)
    t.pass()
})

test.serial('readLine test', async t => {
    t.plan(1)
    await readLine(filePath, (data) => {
        console.log(`readLine ==> ${data}`)
    })
    t.pass()
})

test.serial('ReadStrObj test', async t => {
    t.plan(1)
    const readStrObj = new ReadStrObj(filePath)
    let a = await readStrObj.read()
    let b = await readStrObj.read()
    let result = []
    while(!readStrObj.finished) {
        let str = await readStrObj.read()
        if (str !== null) {
            result.push(str)
        }
    }
    t.is(Number.parseInt(b), result.length / 2)
})
