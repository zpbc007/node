const path = require('path')
const SymbolGraph = require('../../../src/algorithm/3.graph/9.SymbolGraph').SymbolGraph
const BreadthFirstPaths= require('../../../src/algorithm/3.graph/5.BreadthFirstPaths').BreadthFirstPaths

const routes = path.join(__dirname, '../../../resource/routes.txt')
const movies = path.join(__dirname, '../../../resource/movies.txt')

let callback = null

test()
 
// 控制执行哪个方法
function test () {
    console.log(`请选择要执行的方法 test1, test2`)
    callback = data => {
        if (data === 'test1') {
            test1()
        } else if (data === 'test2') {
            test2()
        } else {
            console.log(`不存在该方法${data}`)
        }
    }
    getDataFromCommand()
}

async function test1() {
    console.log('符号图（邻接表）test')
    let args = process.argv.slice(2)
    let filePath = ''
    if (args[0] === 'routes') {
        filePath = routes
    } else {
        filePath = movies
    }
    const symbolGraph = await new SymbolGraph(filePath, args[1])
    const graph = symbolGraph.G()
    callback = (data) => {
        for (let w of graph.connectedNodes(symbolGraph.index(data))) {
            console.log(`    ${symbolGraph.name(w)}`)
        }
    }
    getDataFromCommand()
}

async function test2 () {
    console.log('符号图 深度优先遍历查找最短路径 test')
    let args = process.argv.slice(2)
    let filePath = ''
    if (args[0] === 'routes') {
        filePath = routes
    } else {
        filePath = movies
    }
    const symbolGraph = await new SymbolGraph(filePath, args[1])
    const graph = symbolGraph.G()
    const source = args[2]
    if (!symbolGraph.contains(source)) {
        console.log(`不存在: ${source}`)
        return 
    }

    const bfs = new BreadthFirstPaths(graph, symbolGraph.index(source))
    callback = (data) => {
        if (symbolGraph.contains(data)) {
            let dataIndex = symbolGraph.index(data)
            if (bfs.hasPathTo(dataIndex)) {
                for (let v of bfs.pathTo(dataIndex)) {
                    console.log(`    ${symbolGraph.name(v)}`)
                }
            } else {
                console.log(`${source} 与 ${data} 不相连`)
            }
            
        } else {
            console.log(`不存在: ${data}`)
        }
    }
    getDataFromCommand()
}

// 读取命令行数据
function getDataFromCommand () {
    process.stdin.setEncoding('utf8')
    process.stdin.on('readable', () => {
        const chunk = process.stdin.read()
        if (chunk !== null) {
            callback(chunk.trim())
        }
    })

    process.stdin.on('end', () => {
        process.stdout.write('end')
    })
}

// 向命令行写入数据
function writeDataToCommand (data) {
    process.stdout.write(`${data}`)
}
