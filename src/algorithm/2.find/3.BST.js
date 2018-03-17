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

        addMethod(this, 'min', () => {
            return this.min(this.root).key
        })
        addMethod(this, 'min', (node) => {
            if (node.left === null) return node
            return this.min(node.left)
        })

        addMethod(this, 'floor', (key) => {
            const node = this.floor(this.root, key)
            if (node === null) return null
            return node.key
        })
        addMethod(this, 'floor', (node, key) => {
            if (node === null) {
                return null
            }

            if (key === node.key) {
                return node
            } else if (key < node.key) {
                return this.floor(node.left, key)
            } else {
                const t = this.floor(node.right, key)
                if (t !== null) return t
                return node
            }
        })

        // 选择排名为k的键
        addMethod(this, 'select', (k) => {
            const node = this.select(this.root, k)
            if (node === null) {
                return null 
            } else {
                return node.key
            }
        })
        addMethod(this, 'select', (node, k) => {
            if (node === null) return null
            
            let t = this.size(node.left)
            if (t > k) {
                return this.select(node.left, k)
            } else if (t < k) {
                return this.select(node.right, k - t - 1)
            } else {
                return node
            }
        })

        // 返回给定键的排名
        addMethod(this, 'rank', (key) => {
            return this.rank(this.root, key)
        })
        addMethod(this, 'rank', (node, key) => {
            if (node === null) {
                return 0
            }
            if (key < node.key) {
                return this.rank(node.left, key)
            } else if (key > node.key) {
                return this.rank(node.right, key) + this.size(node.left) + 1
            } else {
                return this.size(node.left)
            }
        })

        // 删除最小键
        addMethod(this, 'delMin', (callback) => {
            this.root = this.delMin(this.root, callback)
        })
        addMethod(this, 'delMin', (node, callback) => {
            if (node.left === null) {
                callback(node)
                return node.right
            }
            node.left = this.delMin(node.left, callback)
            node.N = this.size(node.left) + this.size(node.right) + 1
            return node
        })

        // 删除指定键
        addMethod(this, 'delete', (key) => {
            this.root = this.delete(this.root, key)
        })
        addMethod(this, 'delete', (node, key) => {
            if (node === null) return null

            if (node.key > key) {
                node.left = this.delete(node.left, key)
            } else if (node.key < key) {    
                node.right = this.delete(node.right, key)
            } else {
                if (node.left === null) {
                    return node.right
                }
                if (node.right === null) {
                    return node.left
                }
                const t = node
                node = this.min(t.right)
                node.right = this.delMin(t.right, () => {})
                node.left = t.left
            }
            node.N = this.size(node.left) + this.size(node.right) + 1
            return node
        })
        
        // 返回所有键
        addMethod(this, 'keys', () => {
            let result = []
            this.traverseTree((node) => {
                result.push(node.key)
            })
            return result
        })
        // traverse方法会遍历所有节点，在有key的时候用key值判断可以减少遍历次数
        addMethod(this, 'keys', (lo, hi) => {
            let result = []
            this.keys(this.root, result, lo, hi)
            return result
        })
        addMethod(this, 'keys', (node, arr, lo, hi) => {
            if (node === null) {
                return 
            }
            if (lo < node.key) this.keys(node.left, arr, lo, hi)
            if (lo <= node.key && hi >= node.key) arr.push(node.key)
            if (hi > node.key) this.keys(node.right, arr, lo, hi)
        })
    }

    contains (key) {
        return this.get(key) !== null
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