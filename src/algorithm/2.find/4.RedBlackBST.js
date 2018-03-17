const addMethod = require('../../../util/util').addMethod

const RED = true
const BLACK = false

class Node {
    /**
     * 内部节点
     * @param {*} key 
     * @param {*} val 
     * @param {*} N 
     * @param {*} color 
     */
    constructor (key, val, N, color) {
        this.key = key
        this.val = val
        this.N = N
        this.color = color
        this.left= this.right = null
    }
}

class RedBlackBST {
    constructor () {
        this.root = null

        addMethod(this, 'size', () => {
            return this.size(this.root)
        })
        addMethod(this, 'size', (node) => {
            if (node === null) {
                return 0
            }
            return node.N
        })

        addMethod(this, 'put', (key, val) => {
            this.root = this.put(this.root, key, val)
            // 根节点始终为黑色
            this.root.color = BLACK
        })
        addMethod(this, 'put', (node, key, val) => {
            if (node === null) {
                return new Node(key, val, 1, RED)
            }

            if (key > node.key) {
                node.right = this.put(node.right, key, val)
            } else if (key < node.key) {
                node.left = this.put(node.left, key, val)
            } else {
                node.val = val
            }

            // 只有一个右链接
            if (this.isRed(node.right) && !this.isRed(node.left)) {
                node = this.rotateLeft(node)
            } 
            if (this.isRed(node.left) && this.isRed(node.left.left)) { // 两个相连的左链接 4-节点
                node = this.rotateRight(node)
            } 
            if (this.isRed(node.left) && this.isRed(node.right)) {
                this.flipColors(node)
            }

            node.N = this.size(node.left) + this.size(node.right) + 1

            return node
        })

        // 根据key取值
        addMethod(this, 'get', (key) => {
            const node = this.get(this.root, key)
            return node === null ? null : node.val
        })
        addMethod(this, 'get', (node, key) => {
            if (node === null) {
                return null
            }

            if (key < node.key) {
                return this.get(node.left, key)
            } else if (key > node.key) {
                return this.get(node.right, key)
            } else {
                return node
            }
        })

        addMethod(this, 'delete', (key) => {
            this.root = this.delete(this.root, key)
        })
        addMethod(this, 'delete', (node, key) => {
            if (node === null) {
                return
            }
            // 将所有4-节点拆分
            if (this.isRed(node.left) && this.isRed(node.right)) {
                this.flipColors(node)
            }

            if (key > node.key) {
                node.right = this.delete(node.right, key)
            } else if (key < node.key) {
                node.left = this.delete(node.left, key)
            } 

            if (this.isRed(node.right) && !this.isRed(node.left)) {
                this.rotateLeft(node)
            }
            if (this.isRed(node.left) && this.isRed(node.left.left)) {
                this.rotateRight(node)
            }

            node.N = this.size(node.left) + this.size(node.right) + 1
            return node
        })

        // 遍历
        addMethod(this, 'traverseTree', (callback) => {
            this.traverseTree(this.root, callback)
        })
        addMethod(this, 'traverseTree', (node, callback) => {
            if (node === null) {
                return 
            }
            this.traverseTree(node.left, callback)
            callback(node)
            this.traverseTree(node.right, callback)
        })

        addMethod(this, 'keys', () => {
            const result = []
            this.traverseTree((node) => {
                result.push(node.key)
            })
            return result
        })
    }

    // 判断节点是否为红色
    isRed (node) {
        if (node === null) {
            return false
        }
        return node.color === RED
    }
    // 4-节点转为两个2-节点
    flipColors (node) {
        node.left.color = BLACK
        node.right.color = BLACK
        node.color = RED
    }
    // 将节点右链接左旋
    rotateLeft (node) {
        // 改变链接
        const x = node.right
        node.right = x.left
        x.left = node
        // 改变颜色
        x.color = node.color
        node.color = RED
        // 更新计数器
        x.N = node.N
        node.N = this.size(node.left) + this.size(node.right) + 1

        return x
    }
    // 将节点左链接右旋
    rotateRight (node) {
        // 改变链接
        const x = node.left
        node.left = x.right
        x.right = node
        // 改变颜色 
        x.color = node.color
        node.color = RED
        // 更新计数器
        x.N = node.N
        node.N = this.size(node.left) + this.size(node.right) + 1

        return x
    }

    contains (key) {
        return this.get(key) !== null
    }
}

exports.RedBlackBST = RedBlackBST