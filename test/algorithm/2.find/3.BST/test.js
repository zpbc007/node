import test from 'ava'
const BinarySearchTree = require('../../../../src/algorithm/2.find/3.BST').BST
const QuickSort = require('../../../../src/algorithm/1.sort/3.快速排序').QuickSort
const data = require('./test.json')

test('二叉搜索树 min test', t => {
    t.plan(1)
    const bst = new BinarySearchTree()
    let min = data[0].key
    data.forEach(element => {
        bst.put(element.key, element.val)
        if (element.key < min) min = element.key
    })

    t.is(bst.min(), min)
})

test('二叉搜索树 floor test', t => {
    t.plan(1)
    const bst = new BinarySearchTree()
    let arg = 'f'
    let arr = []
    data.forEach(element => {
        bst.put(element.key, element.val)
        arr.push(element.key)
    })
    t.is(bst.floor(arg), floorInArray(arr, arg))
})

test('二叉搜索树 select test', t => {
    t.plan(1)
    const arr = []
    const bst = new BinarySearchTree()
    data.forEach(element => {
        bst.put(element.key, element.val)
        arr.push(element.key)
    })
    t.is(bst.select(3), select(arr, 3))
})

test('二叉搜索树 rank test', t => {
    t.plan(1)
    const bst = new BinarySearchTree()
    const arr = []
    data.forEach(element => {
        bst.put(element.key, element.val)
        arr.push(element.key)
    })

    t.is(bst.rank(arr[2]), rank(arr, arr[2]))
})


function floorInArray (arr, val) {
    QuickSort(arr)
    let pre = arr[0]
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i] === val) {
            return val
        } else if (arr[i] < val) {
            pre = arr[i]
        } else {
            return pre
        }
    }
    return pre
}

function select (arr, k) {
    QuickSort(arr)
    return arr[k]
}

function rank (arr, key) {
    QuickSort(arr)
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === key) {
            return i
        }
    }
}