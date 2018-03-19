import test from 'ava'
import fs from 'fs'
import path from 'path'
import { readLine } from '../../../util/util'
const Graph = require('../../../src/algorithm/3.graph/2.Graph').Graph 
const Search = require('../../../src/algorithm/3.graph/3.DepthFirstSearch').DepthFirstSearch
const DepthFirstPaths = require('../../../src/algorithm/3.graph/4.DepthFirstPaths').DepthFirstPaths
const BreadthFirstPaths = require('../../../src/algorithm/3.graph/5.BreadthFirstPaths').BreadthFirstPaths

const tinyG = path.join(__dirname, '../../../resource/tinyG.txt')
const tinyCG = path.join(__dirname, '../../../resource/tinyCG.txt')

test('Graph test', async t => {
    t.plan(1)
    const graph = await new Graph(tinyG)
    t.pass()
})

test('深度优先遍历 test', async t => {
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

test('深度优先寻找路径 test', async t => {
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

test('广度优先寻找路径 test', async t => {
    t.plan(1)
    debugger
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