/**
 * 存放索引与对象，对索引排序
 */
class IndexMinPQ {
    constructor () {
        // 存放元素在keys中的位置（用来排序）
        this.qp = [null]
        // 存放元素在堆pq中的位置
        this.pq = [null]
        // value为元素，index为key
        this.keys = [null]
    }
    /**
     * 交换位置
     * @param {*} i 
     * @param {*} j 
     */
    exchange (i, j) {
        let temp = this.pq[i]
        this.pq[i] = this.pq[j] 
        this.pq[j] = temp

        this.qp[this.pq[i]] = i
        this.qp[this.pq[j]] = j
    }
    /**
     * 当前堆大小
     */
    size () {
        return this.pq.length - 1
    }
    /**
     * 改变index对应的key
     * @param {*} i 
     * @param {*} key 
     */
    change (i, key) {
        this.keys[i] = key

        this.swim(this.qp[i])
        this.sink(this.qp[i])
    }
    /**
     * 比较两个元素的大小
     * @param {*} i 
     * @param {*} j 
     */
    less (i, j) {
        return this.keys[this.pq[i]] < this.keys[this.pq[j]]
    }
    /**
     * 上浮
     */
    swim (k) {
        while (k > 1 && this.less(k, Number.parseInt(k / 2))) {
            this.exchange(k, Number.parseInt(k / 2))
            k = Number.parseInt(k / 2)
        }
    }
    /**
     * 下沉
     */
    sink (k) {
        while (k * 2 <= this.size()) {
            let j = k * 2
            if (j < this.size() && !this.less(j, j + 1)) {
                j++
            }
            if (this.less(k, j)) {
                break
            }
            this.exchange(k, j)
            k = j
        }
    }
    contains (k) {
        return this.keys[k] !== null && this.keys[k] !== undefined
    }
    insert (k, key) {
        let kIndex = Number.parseInt(k) + 1
        if (this.contains(kIndex)) {
            throw new Error(`${k}已经存在`)
        }
        if (k < 0) {
            throw new Error(`${k}超出了范围`)
        }
        this.keys[kIndex] = key
        this.pq.push(kIndex)
        this.qp[kIndex] = this.size()
        this.swim(this.qp[kIndex])
    }
    delete (i) {
        let index = this.qp[i]
        this.exchange(index, this.size())
        let result = this.keys[i]
        this.keys[i] = null
        this.pq.splice(this.size(), 1)
        this.qp[i] = null
        this.swim(index)
        this.sink(index)
    
        return result
    }
    min () {
        return this.keys[this.pq[1]]
    }
    minIndex () {
        return this.pq[1] - 1
    }
    delMin () {
        let minIndex = this.minIndex()
        this.exchange(1, this.size())
        this.keys[minIndex + 1] = null
        this.qp[minIndex + 1] = null
        this.pq.splice(this.size(), 1)
        this.sink(1)
        return minIndex
    }
    isEmpty () {
        return this.pq.length === 1
    }
}

exports.IndexMinPQ = IndexMinPQ