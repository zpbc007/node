const readline = require('../../../util/util').readLine
const Graph = require('./2.Graph').Graph

class SymbolGraph {
    constructor  (filePath, split) {
        this.st = {} // 符号名 -> 索引
        this.keys = [] // 索引 -> 符号名
        this.graph = null

        return new Promise(async (resolve, reject) => {
            await readline(filePath, (line) => {
                let keys = line.split(split)
    
                for (let key of keys) {
                    if (!this.st[key] && this.st[key] !== 0) {
                        this.st[key] = Object.keys(this.st).length
                    }
                }
            })
    
            for (let key in this.st) {
                this.keys[this.st[key]] = key
            }
    
            this.graph = await new Graph(this.keys.length)
    
            await readline(filePath, (line) => {
                let keys = line.split(split)
                let v = this.st[keys[0]]
                for (let i = 1, len = keys.length; i < len; i++) {
                    this.graph.addEdge(v, this.st[keys[i]])
                }
            })

            resolve(this)
        })
    }

    contains (key) {
        return this.st[key] !== undefined && this.st[key] !== null
    }

    index (key) {
        return this.st[key]
    }

    name (index) {
        return this.keys[index]
    }

    G () {
        return this.graph
    }
}

module.exports = {
    SymbolGraph
}