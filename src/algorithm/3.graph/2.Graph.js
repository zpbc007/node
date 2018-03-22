const { ReadStrObj } = require('../../../util/util')
 
class Graph {
    /**
     * 判断参数类型，如果为数字，初始化图，如果为字符串，从字符串读取文件
     * @param {*} arg 
     */
    constructor (arg) {
        return new Promise(async (resolve, reject) => {
            // 从路径中读取文件
            if (typeof arg === 'string') {
                await this.initByFile(arg)
            } 
            // 初始化图的大小
            if (typeof arg === 'number') {
                this.initByNum(arg)
            }
            resolve(this)
        })
    }

    // 根据节点数量初始化图
    initByNum (pointsNum) {
        this.V = pointsNum
        this.E = 0
        this.adj = []
        for (let i = 0; i < pointsNum; i++) {
            this.adj.push([])
        }
    }

    // 根据输入的文件内容初始化图
    async initByFile (filePath) {
        let init = true
        let readObj = new ReadStrObj(filePath)
        this.initByNum(await readObj.read())
        for (let i = 0, len = await readObj.read(); i < len; i++) {
            let v = await readObj.read()
            let w = await readObj.read()
            this.addEdge(v, w)
        }
    }

    // 添加边
    addEdge (v, w) {
        this.adj[v].push(w)
        this.adj[w].push(v)
        this.E++
    }

    // 节点数
    getV () {
        return this.V
    }

    // 边数
    getE () {
        return this.E
    }

    // 与节点相连的所有节点
    connectedNodes (v) {
        return this.adj[v] || []
    }
}

module.exports = {
    Graph
}