const fs = require('fs')
/**
 * 给对象添加方法实现重载
 * @param {*} obj 添加方法的对象
 * @param {*} name 方法名
 * @param {*} fun 添加的方法
 */
function addMethod (obj, name, fun) {
    let old = obj[name]
    obj[name] = function () {
        if (fun.length === arguments.length) {
            return fun.apply(this, arguments)
        } else if (typeof old === 'function') {
            return old.apply(this, arguments)
        }
    }
}

/**
 * 判断连个数组的元素是否相同
 * @param {*} arr1 
 * @param {*} arr2 
 */
function arrayEqual (arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }
    for (let element of arr1) {
        if (!arr2.includes(element)) {
            return false
        } else {
            arr2.splice(arr2.indexOf(element), 1)
        }
    }
    if (arr2.length !== 0) {
        return false
    }
    return true
}

function readFile (path) {
    return new Promise((resolve, reject) => {
        console.group('读取文件')
        console.log(`开始读取文件: ${path}`)
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                throw new Error(`读取文件: ${path} 出错`)
                reject()
            } else {    
                console.log(`文件读取结束: ${path}`)
                console.groupEnd()
                resolve(data)
            }
        })
    })
}

function readLine (path, callback) {
    const inputStream = fs.createReadStream(path)
    return new Promise ((resolve, rejcet) => {
        let remaining = ''

        inputStream.on('data', data => {
            remaining += data
            let index = remaining.indexOf('\n')
            let last = 0
            while (index > -1) {
                let line = remaining.substring(last, index)
                last = index + 1
                callback(line)
                index = remaining.indexOf('\n', last)
            }
            remaining = remaining.substring(last)
        })

        inputStream.on('end', () => {
            if (remaining.length > 0) {
                callback(remaining)
                resolve()
            }
        })

        inputStream.on('close', () => {
            resolve()
        })

        inputStream.on('error', () => {
            reject()
        })
    })  
}

// 读取文件返回对象
class ReadStrObj {
    constructor (path) {
        this.finished = false
        this.dataArr = []
        this.stream = fs.createReadStream(path)
        this.pause()

        // 绑定事件
        this.stream.on('data', data => {
            this.pause()
            this.getData(data)
            if (this._resolve) {
                this._resolve()
                this._resolve = null
            }
        })
        this.stream.on('end', () => {
            this.finished = true
            if (this._resolve) {
                this._resolve()
            }
        })
        this.stream.on('close', () => {
            this.finished = true
            if (this._resolve) {
                this._resolve()
            }
        })
        this.stream.on('error', () => {
            this.finished = true
            throw new Error(`读取文件发生错误`)
        })
    }
    // 将数据按字符串分割
    getData (data) {
        let flat = []
        flatArr(data.toString().split('\n').map(item => item.split(' ')), flat)
        this.dataArr = this.filterData(this.dataArr.concat(flat))
    }
    // 过滤无用数据
    filterData (dataArr) {
        return dataArr.filter(item => item != undefined 
                && item != null 
                && item != '' 
                && item != ' ' 
                && item != '\n' )
    }

    pause () {
        if (!this.stream.isPaused()) {
            this.stream.pause()
        }
    }

    resume () {
        return new Promise((resolve, reject) => {
            if (this.stream.isPaused()) {
                this.stream.resume()
                this._resolve = resolve
            } else {
                resolve()
            }
        })
    }

    // 返回promise
    read () {
        return new Promise((resolve, reject) => {
            // 有值直接返回
            if (this.dataArr.length > 0) {
                resolve(this.readFromSelf())
            } else if (!this.finished) { // 流没有读完，继续读
                resolve(this.readFromStream())
            } else {
                resolve(null)
            }
        })
    }

    readFromSelf () {
        if (this.dataArr.length === 0) {
            return null
        }
        return this.dataArr.splice(0, 1)[0]
    }

    async readFromStream () {
        await this.resume()
        return this.readFromSelf()
    }
}

// 多维数组转为一维数组
function flatArr (data, result) {
    if (data instanceof Array) {
        for (let item of data) {
            flatArr(item, result)
        }
    } else {
        result.push(data)
    }
}

module.exports = {
    addMethod,
    arrayEqual,
    readFile,
    readLine,
    ReadStrObj,
    flatArr
}