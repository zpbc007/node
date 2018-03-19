/**
 * 计算节点v的度(相邻节点的数量)
 * @param {*} graph 
 * @param {*} v 
 */
function degree (graph, v) {
    let degree = 0
    for (let i of graph.agj(v)) {
        degree++
    }
    return degree
}

/**
 * 计算所有节点的最大度数
 * @param {*} graph 
 */
function maxDegree (graph) {
    let max = 0
    for (let i = 0, len = graph.V(); i < len; i++) {
        if (degree(graph, v) > max) {
            max = degree(graph, v)
        }
    }
    return max
}

/**
 * 计算图的平均度数
 * @param {*} graph 
 */
function avgDegree (graph) {
    return 2 * graph.E() / graph.V()
}

/**
 * 计算自环的个数
 * @param {*} graph 
 */
function numberOfSelfLoops (graph) {
    let count = 0
    for (let v = 0, len = graph.V(); v < len; v++) {
        for (let w of graph.adj(v)) {
            if (v === w) count++
        }
    }
    return count
}