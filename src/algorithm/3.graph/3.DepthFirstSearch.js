class DepthFirstSearch {
    constructor (graph, s) {
        this.marked = []
        this.count = 0
        this.dfs(graph, s)
    }

    dfs (graph, v) {
        this.marked[v] = true
        this.count++
        for (let w of graph.connectedNodes(v)) {
            if (!this.marked[w]) {
                this.dfs(graph, w)
            }
        }
    }

    getMarked (w) {
        return this.marked[w]
    }

    getCount () {
        return this.count
    }
}

module.exports = {
    DepthFirstSearch
}