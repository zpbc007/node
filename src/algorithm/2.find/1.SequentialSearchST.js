class Node {
    constructor (key, val, next) {
        this.key = key
        this.val = val
        this.next = next
    }
}

class Search {
    constructor () {
        this.first = null
    }

    [Symbol.iterator] () { 
        this.current = this.first
        return {
            next: this.next
        }
    }

    next () {
        if (this.current !== null) {
            this.current = this.current.next
            return {
                done: false,
                value: this.current
            }
        } else {
            return {
                done: true
            }
        }
    }

    get (key) {
        if (key === null) {
            throw new Error(`key值不能为空`)
        }
        let tempNode = this.first
        while (tempNode !== null) {
            if (key === tempNode.key) {
                return tempNode.val
            }
            tempNode = tempNode.next
        }
        return null
    }

    put (key, value) {
        if (key === null || value === null) {
            throw new Error(`key与value都不能为空`)
        }

        let tempNode = this.first

        while (tempNode !== null) {
            if (key === tempNode.key) {
                tempNode.val = value
                return
            }
            tempNode = tempNode.next
        }
        this.first = new Node(key, value, this.first)
    }

    contains (key) {
        return this.get(key) !== null
    }

    keys () {
        let result = [],
            tempNode = this.first
        
        while (tempNode !== null) {
            result.push(tempNode.key)
            tempNode = tempNode.next
        } 

        return result
    }
}

exports.Search = Search