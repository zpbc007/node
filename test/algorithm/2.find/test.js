import test from 'ava'
import fs from 'fs'
import path from 'path'
const SequentialSearchST = require('../../../src/algorithm/2.find/1.SequentialSearchST').Search
const BinarySearchST = require('../../../src/algorithm/2.find/2.BinarySearchST').Search
const BinarySearchTree = require('../../../src/algorithm/2.find/3.BST').BST

test.serial('无序链表的顺序查找test', async t => {
    t.plan(1)
    await testFunc(new SequentialSearchST())
    t.pass()
})

test.serial('有序数组的二分查找test', async t => {
    t.plan(1)
    await testFunc(new BinarySearchST())
    t.pass()
})

test.serial('二分查找树test', async t => {
    t.plan(1)
    await testFunc(new BinarySearchTree())
    t.pass()
})

async function testFunc (st) {
    // 读取文件 转为字符串数组
    const fileData = await readFile(path.join(__dirname, '../../../resource/tale.txt'))
    console.log('文件转换开始')
    const dataArr = fileData.split('\n').map(item => item.split(' '))
    const stringArr = []
    flatArr(dataArr, stringArr)
    console.log('文件转换结束')
    console.time('开始')
    // 遍历数组放入st中
    for (let str of stringArr) {
        if (!st.contains(str)) {
            st.put(str, 1)
        } else {
            st.put(str, st.get(str) + 1)
        }
    }

    let max = ''
    st.put(max, 0)
    const keys = st.keys()
    for (let word of keys) {
        if (st.get(word) > st.get(max)) {
            max = word
        }
    }

    console.log(`${max} ${st.get(max)}`)
    console.timeEnd('开始')
}

// 读取文件 转为string
function readFile (path) {
    return new Promise((resolve, reject) => {
        console.log('文件读取开始')
        fs.readFile(path, 'utf8',(err, data) => {
            if (err) {
                console.log(`读取文件出错: ${err}`)
                reject()
            } else {
                console.log('文件读取结束')
                resolve(data)
            }
        })
    })
}
// 多维数组转为一维数组
function flatArr (data, result) {
    if (data instanceof Array) {
        for (let item of data) {
            flatArr(item, result)
        }
    } else {
        result.push(data)
    }
}