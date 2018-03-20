class Cycle {
    constructor (graph) {
        this.marked = []
        this.cycle = false

        for (let s = 0, len = graph.getV(); s < len; s++) {
            if (!this.marked[s]) {
                this.dfs(graph, s, s)
            }
        }
    }
    /**
     * 遍历
     * @param {*} graph 
     * @param {*} v 当前遍历节点
     * @param {*} u 上个节点
     */
    dfs (graph, v, u) {
        this.marked[v] = true

        for (let w of graph.connectedNodes(v)) {
            if (!this.marked[w]) {
                this.dfs(graph, w, v)
            } else {
                // 如果节点已经被遍历过且不是当前节点的前一个节点，说明有环
                if (w !== u) this.cycle = true
            }
        }
    }

    hasCycle () {
        return this.cycle
    }
}

module.exports = {
    Cycle
}