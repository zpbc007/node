/**
 * 自底向上的归并排序
 * @param {number[]} arr 待排序数组
 */
function MergeSort(arr) {
    let length = arr.length

    for (let size = 1; size < length; size += size) {
        for (let lo = 0; lo < length - size; lo += 2 * size) {
            mergeArr(arr, lo, lo + size - 1, Math.min(lo + 2 * size - 1, length - 1))
        }
    }
}

/**
 * 合并两个有序数组
 * @param {number[]} arr 待排序数组 
 * @param {number} lo 起点  
 * @param {number} mid 中点
 * @param {number} hi 终点 
 */
function mergeArr(arr, lo, mid, hi) {
    let i = lo, j = mid + 1, temp = []

    // 复制数组
    for (let k = lo; k <= hi; k++) {
        temp[k] = arr[k]
    }

    for (let k = lo; k <= hi; k++) {
        // 左侧数组遍历完，从右侧取
        if (i > mid) {
            arr[k] = temp[j++]
        } else if (j > hi) { //右侧数组遍历完，从左侧取 
            arr[k] = temp[i++]
        } else if (temp[j] < temp[i]) {// 右侧元素小于左侧元素，取右侧
            arr[k] = temp[j++]
        } else {// 左侧小取左侧
            arr[k] = temp[i++]
        }
    }
}

exports.MergeSort = MergeSort