// api测试
import test from 'ava'
const arrayEqual = require('../../../util/util').arrayEqual
const SequentialSearchST = require('../../../src/algorithm/2.find/1.SequentialSearchST').Search
const BinarySearchST = require('../../../src/algorithm/2.find/2.BinarySearchST').Search
const BinarySearchTree = require('../../../src/algorithm/2.find/3.BST').BST
const RedBlackBST = require('../../../src/algorithm/2.find/4.RedBlackBST').RedBlackBST

const data = require('./baseTestData.json')
// put get 测试
test('无序链表的顺序查找 put/get test', t => {
    putGetTest(new SequentialSearchST(), t)
})
test('有序数组的二分查找 put/get test', t => {
    putGetTest(new BinarySearchST(), t)
})
test('二分查找树 put/get test', t => {
    putGetTest(new BinarySearchTree(), t)
})
test('红黑树 put/get test', t => {
    putGetTest(new RedBlackBST(), t)
})

// keys 测试
test('无序链表的顺序查找 keys test', t => {
    keysTest(new SequentialSearchST(), t)
})
test('有序数组的二分查找 keys test', t => {
    keysTest(new BinarySearchST(), t)
})
test('二分查找树 keys test', t => {
    keysTest(new BinarySearchTree(), t)
})
test('红黑树 keys test', t => {
    keysTest(new RedBlackBST(), t)
})

function putGetTest(st, t) {
    t.plan(data.length)
    
    data.forEach(element => {
        st.put(element.key, element.val)  
    })

    data.forEach(element => {
        t.is(st.get(element.key), element.val)
    })
}

function keysTest(st, t) {
    t.plan(1)
    let keys = []
    data.forEach(element => {
        st.put(element.key, element.val)  
        keys.push(element.key)
    })
    let result = arrayEqual(keys, st.keys())
    t.is(true, result)
}