import test from 'ava'
const RedBlackBST = require('../../../../src/algorithm/2.find/4.RedBlackBST').RedBlackBST
const data = require('../baseTestData.json')

test('红黑树 size test', t => {
    t.plan(1)
    const bst = new RedBlackBST()
    data.forEach(element => {
        bst.put(element.key, element.val)
    })
    
    t.is(data.length, bst.size())
})
