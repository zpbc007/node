/**
 * 优先队列
 */
class MaxPQ {
    constructor () {
        this.pq = [null]
    }
    isEmpty () {
        return this.pq.length === 0
    }
    size () {
        return this.pq.length
    }
    insert (i) {
        this.pq.push(i)
        this.swim(this.size() - 1)
    }
    delMax () {
        this.exch(1, this.size() - 1)
        let max = this.pq.pop()
        this.sink(1)
        return max
    }
    /**
     * 比较队列中两个元素的大小
     * @param {*} i 
     * @param {*} j 
     */
    less (i, j) {
        return this.pq[i] < this.pq[j] 
    }
    /**
     * 交换队列元素位置
     * @param {*} i 
     * @param {*} j 
     */
    exch (i, j) {
        let temp = this.pq[i]
        this.pq[i] = this.pq[j]
        this.pq[j] = temp
    }
    /**
     * 上浮元素
     * @param {*} k 
     */
    swim (k) {
        while(k > 1 && this.less(Number.parseInt(k / 2), k)) {
            this.exch(Number.parseInt(k / 2), k)
            k = Number.parseInt(k / 2)
        }
    }
    /**
     * 下沉
     * @param {*} k 
     */
    sink (k) {
        // 判断是否到达了底层（是否为叶子节点）
        let N = this.pq.length
        while (2 * k < N) {
            let j = 2 * k
            if (j < N && this.less(j, j + 1)) j++
            if (!this.less(k, j)) break
            this.exch(k, j)
            k = j
        }
    }
}

exports.MaxPQ = MaxPQ