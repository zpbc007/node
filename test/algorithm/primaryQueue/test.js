// const test = require('ava')
import test from 'ava'
const MaxPQ = require('../../../src/algorithm/1.sort/5.优先队列').MaxPQ
const data = require('./data.json')

test('优先队列test', (t) => {
    let len = data.array.length
    t.plan(len)
    const pq = new MaxPQ()
    data.array.forEach(element => {
        pq.insert(element)
    })

    for (let i =0; i < len; i++) {
        t.is(pq.delMax(), data.expected.shift())
    }
})