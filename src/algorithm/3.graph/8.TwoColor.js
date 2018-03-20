class TwoColor {
    constructor (graph) {
        this.marked = []
        this.isTwoColorable = true
        // 初始化第一个节点的颜色
        this.color = [false]
        
        for (let i = 0, len = graph.getV(); i < len; i++) {
            if (!this.marked[i]) {
                this.dfs(graph, i)
            }
        }
    }

    dfs (graph, v) {
        this.marked[v] = true

        for (let w of graph.connectedNodes(v)) {
            if (!this.marked[w]) {
                this.color[w] = !this.color[v]
                this.dfs(graph, w)
            } else {
                if (this.color[w] === this.color[v]) {
                    this.isTwoColorable = false
                }
            }
        }
    }

    isBipartite () {
        return this.isTwoColorable
    }
}

module.exports = {
    TwoColor
}