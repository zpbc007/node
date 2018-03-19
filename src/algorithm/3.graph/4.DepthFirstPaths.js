class DepthFirstPaths {
    constructor (graph, s) {
        // 节点是否遇到过
        this.marked = []
        // 从起点到改点的路径上的最后一个节点 index: 当前节点 value: 路径上的最后一个节点
        this.edgeTo = []
        this.s = s
        this.dfs(graph, s)
    }

    dfs (graph, v) {
        this.marked[v] = true
        // 遍历所有相连的节点
        for (let w of graph.connectedNodes(v)) {
            // 如果结点没有遇到过继续遍历节点的子节点
            if (!this.marked[w]) {
                this.edgeTo[w] = v
                this.dfs(graph, w)
            }
        }
    }

    hasPathTo (v) {
        return this.marked[v] === true
    }

    pathTo (v) {
        if (!this.hasPathTo(v)) {
            return null
        }

        let path = []
        for (let x = v; x !== this.s; x = this.edgeTo[x]) {
            path.unshift(x)
        }
        path.unshift(this.s)
        return path
    }
}

module.exports = {
    DepthFirstPaths
}

