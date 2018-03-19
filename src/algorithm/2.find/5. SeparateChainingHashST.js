const Search = require('./1.SequentialSearchST').Search
// 基于拉链法的散列表
class SeparateChainingHashST {
    constructor (m = 997) {
        this.M = m
        // 建立m个链表
        for (i = 0; i < m; i++) {
            this.st.push(new Search())
        }
    }

    hash (key) {
        
    }
}