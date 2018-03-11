import test from 'ava'
const IndexMinPQ = require('../../../src/algorithm/sort/6.关联索引的优先队列').IndexMinPQ
const data = require('./data.json')

test('关联索引的优先队列test', t => {
    let len = data.data.length
    t.plan(len * 2)
    const minpq = new IndexMinPQ()
    data.data.forEach(item => {
        minpq.insert(item.key, item.value)
    })
    data.expected.forEach(item => {
        t.is(item.key, minpq.minIndex().toString())
        t.is(item.value, minpq.min())
        minpq.delMin()
    })
})