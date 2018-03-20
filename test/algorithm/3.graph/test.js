import test from 'ava'
import fs from 'fs'
import path from 'path'
import { readLine } from '../../../util/util'
const Graph = require('../../../src/algorithm/3.graph/2.Graph').Graph 
const Search = require('../../../src/algorithm/3.graph/3.DepthFirstSearch').DepthFirstSearch
const DepthFirstPaths = require('../../../src/algorithm/3.graph/4.DepthFirstPaths').DepthFirstPaths
const BreadthFirstPaths = require('../../../src/algorithm/3.graph/5.BreadthFirstPaths').BreadthFirstPaths
const CC = require('../../../src/algorithm/3.graph/6.CC').CC
const Cycle = require('../../../src/algorithm/3.graph/7.Cycle').Cycle
const TwoColor = require('../../../src/algorithm/3.graph/8.TwoColor').TwoColor

const tinyG = path.join(__dirname, '../../../resource/tinyG.txt')
const tinyCG = path.join(__dirname, '../../../resource/tinyCG.txt')

test('Graph test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyG)
    t.pass()
})

test('深度优先 遍历 test', async t => {
    t.plan(1)
    // 命令行参数
    const graph = await new Graph(tinyG)
    const search = new Search(graph, 9)
    const connectedNodes = []
    // 所有相连的节点
    for (let i = 0, len = graph.getV(); i < len; i++) {
        if (search.getMarked(i)) {
            connectedNodes.push(i)
        }
    }
    console.log(connectedNodes.join(' '))

    if (connectedNodes.length !== graph.getV()) {
        console.log('not connected')
    } else {
        console.log('connected')
    }

    t.pass()
}) 

test('深度优先 寻找路径 test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyCG)
    const pathSearch = new DepthFirstPaths(graph, 0)
    const start = 0
    for (let i = 0, len = graph.getV(); i < len; i++) {
        let path = `${start} to ${i}: `
        if (pathSearch.hasPathTo(i)) {
            for (let x of pathSearch.pathTo(i)) {
                if (x === start) {
                    path += x
                } else {
                    path += `-${x}`
                }
            }
        }
        console.log(path)
    }
    t.pass()
}) 

test('广度优先 寻找路径 test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyCG)
    const pathSearch = new BreadthFirstPaths(graph, 0)
    const start = 0
    for (let i = 0, len = graph.getV(); i < len; i++) {
        let path = `${start} to ${i}: `
        if (pathSearch.hasPathTo(i)) {
            for (let x of pathSearch.pathTo(i)) {
                if (x === start) {
                    path += x
                } else {
                    path += `-${x}`
                }
            }
        }
        console.log(path)
    }
    t.pass()
}) 

test('广度优先 查找连通分量 test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyCG)
    const cc = new CC(graph)
    debugger
    let m = cc.getCount()
    console.log(`${m} components`)

    let components = []
    for (let i = 0; i < m; i++) {
        components.push([])
    }
    for (let v = 0, len = graph.getV(); v < len; v++) {
        components[cc.getId(v)].push(v)
    }
    for (let i = 0; i < m; i++) {
        let str = `${i}th component: `
        for (let v of components[i]) {
            str += `${v} `
        }
        console.log(str)
    }
    t.pass()
})

test('深度优先 判断图是否有环 test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyCG)
    const cycle = new Cycle(graph)
    t.is(cycle.hasCycle(), true)
}) 

test('深度优先 判断图是否是二分图 test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyCG)
    const twoColor = new TwoColor(graph)
    t.is(twoColor.isBipartite(), false)
})