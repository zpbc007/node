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

module.exports = {
    addMethod,
    arrayEqual
}