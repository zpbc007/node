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

exports.addMethod = addMethod