// const test = require('ava')
import test from 'ava'
// let data = require('./data.json')
var data = require('./data.json') 
// const mergeSortTtoB = require('../../../src/algorithm/sort/1.自顶向下的归并排序').MergeSort 
import mergeSortTtoB from '../../../src/algorithm/sort/1.自顶向下的归并排序'
// const mergeSortBtoT = require('../../../src/algorithm/sort/2.自底向上的归并排序').MergeSort
// const quickSrot = require('../../../src/algorithm/sort/3.快速排序').QuickSort
// const quickSrotThreePart = require('../../../src/algorithm/sort/4.三向切分的快速排序').QuickSort

function testSort (sortFunc: (arr: number[]) => void, t) {
    // 复制数据
    const parseData = JSON.parse(JSON.stringify(data))
    t.plan(parseData.length * 100)
    // 遍历数据
    parseData.forEach((element, index) => {
        // 打印排序100的时间
        console.time(`${index}`)
        // 排序100次
        for (let i = 0; i < 100; i++) {
            sortFunc(element.array)
            t.deepEqual(element.array, element.expected)
        }
        console.timeEnd(`${index}`)
    })
}

test('自顶向下的归并排序test', (t) => {
    testSort(mergeSortTtoB, t)
})
// test('自底向上的归并排序test', (t) => {
//     testSort(mergeSortBtoT, t)
// })
// test('快速排序test', (t) => {
//     testSort(quickSrot, t)
// })
// test('三向切分的快速排序test', (t) => {
//     testSort(quickSrotThreePart, t)
// })