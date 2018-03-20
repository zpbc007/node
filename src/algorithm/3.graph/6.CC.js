// 查找联通分量
class CC {
    constructor (graph) {
        this.marked = []
        this.id = []
        this.count = 0
        for (let s = 0, len = graph.getV(); s < len; s++) {
            if (!this.marked[s]) {
                this.dfs(graph, s)
                this.count++
            }
        }
    }

    dfs (graph, v) {
        this.marked[v] = true
        this.id[v] = this.count

        for (let w of graph.connectedNodes(v)) {
            if (!this.marked[w]) {
                this.dfs(graph, w)
            }
        }
    }

    connected (v, w) {
        return this.id[v] === this.id[w]
    }

    getId (v) {
        return this.id[v]
    } 

    getCount () {
        return this.count
    }
}

module.exports = {
    CC
}