class BreadthFirstPaths {
    constructor (graph, s) {
        this.marked = []
        this.edgeTo = []
        this.s = s

        this.bfs(graph, s)
    }

    bfs (graph, s) {
        const queue = []
        this.marked[s] = true
        queue.push(s)
        while(queue.length > 0) {
            let v = queue.shift()
            for (let w of graph.connectedNodes(v)) {
                if (!this.marked[w]) {
                    this.edgeTo[w] = v
                    this.marked[w] = true
                    queue.push(w)
                }
            }
        }
    }

    hasPathTo (v) {
        return this.marked[v]
    }

    pathTo (v) {
        if (!this.hasPathTo(v)) {
            return null
        }
        let path = []
        for (let i = v; i !== this.s; i = this.edgeTo[i]) {
            path.unshift(i)
        }
        path.unshift(this.s)
        return path
    }
}

module.exports = {
    BreadthFirstPaths
}