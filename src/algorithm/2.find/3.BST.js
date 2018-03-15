const addMethod = require('../../../util/util').addMethod

class BST {
    constructor () {
        this.root = null
        // 添加重载函数
        addMethod(this, 'get', (key) => {
            return this.get(this.root, key)
        })
        addMethod(this, 'get', (node, key) => {
            if (node === null) {
                return null
            }
            if (node.key > key) {
                return this.get(node.left, key)
            } else if (node.key < key) {
                return this.get(node.right, key)
            } else {
                return node.val
            }
        })

        addMethod(this, 'put', (key, val) => {
            this.root = this.put(this.root, key, val)
        })
        addMethod(this, 'put', (node, key, val) => {
            if (node === null) {
                return new Node(key, val, 1)
            }
            if (node.key > key) {
                node.left = this.put(node.left, key, val)
            } else if (node.key < key) {
                node.right = this.put(node.right, key, val)
            } else {
                node.val = val
            }
            node.N = this.size(node.left) + this.size(node.right) + 1

            return node
        })

        addMethod(this, 'size', () => {
            return this.size(this.root)
        })
        addMethod(this, 'size', (node) => {
            if (node === null) {
                return 0
            } else {
                return node.N
            }
        })

        addMethod(this, 'traverseTree', (callback) => {
            return this.traverseTree(this.root, callback)
        })
        addMethod(this, 'traverseTree', (node, callback) => {
            if (node === null) {
                return 
            }
            this.traverseTree(node.left, callback)
            callback(node)
            this.traverseTree(node.right, callback)
        })
    }

    contains (key) {
        return this.get(key) !== null
    }

    keys () {
        let result = []
        this.traverseTree((node) => {
            result.push(node.key)
        })
        return result
    }
}

class Node {
    constructor (key, val, N) {
        this.left = null
        this.right = null
        this.key = key
        this.val = val
        this.N = N
    }
}

exports.BST = BST