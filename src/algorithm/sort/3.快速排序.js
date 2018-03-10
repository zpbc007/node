/**
 * 快速排序
 * 将数组切分，如果左边数组与右边数组都是有序的则整个数组也是有序的
 * @param {number[]} arr 待排序数组 
 */
function QuickSort (arr) {
    sort(arr, 0, arr.length - 1)
}

/**
 * 排序
 * @param {number[]} arr 待排序数组
 * @param {number} lo 起点
 * @param {number} hi 终点
 */
function sort(arr, lo, hi) {
    if (lo >= hi) return
    // 查找切分位置（改位置已经是有序的了）
    let mid = partition(arr, lo, hi)
    sort(arr, lo, mid - 1)
    sort(arr, mid + 1, hi)
}

/**
 * 切分数组 
 * @param {number[]} arr 待切分数组
 * @param {number} lo 起点
 * @param {number} hi 终点
 * @returns {int} 返回切分元素位置
 */
function partition (arr, lo, hi) {
    let i = lo, j = hi + 1, v = arr[lo]

    while(true) {
        while(arr[++i] < v) if (i == hi) break
        while(arr[--j] > v) if (j === lo) break
        if (i >= j) break
        exch(arr, i, j)
    }
    exch(arr, lo, j)
    return j
}

/**
 * 交换数组元素位置
 * @param {number[]} arr 数组 
 * @param {number} i 交换位置1
 * @param {number} j 交换位置2
 */
function exch(arr, i, j) {
    let temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
}

exports.QuickSort = QuickSort