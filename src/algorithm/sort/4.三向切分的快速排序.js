/**
 * 快速排序
 * 将数组切分，如果左边数组与右边数组都是有序的则整个数组也是有序的
 * @param {number[]} arr 待排序数组 
 */
function QuickSort (arr) {
    sort(arr, 0, arr.length - 1)
}

function sort(arr, lo, hi) {
    if (hi <= lo) {
        return 
    }
    let lt = lo, 
        gt = hi,
        i = lo + 1,
        v = arr[lo]

    while(i <= gt) {
        if (arr[i] < v) {
            exchange(arr, i++, lt++)
        } else if (arr[i] > v) {
            exchange(arr, i, gt--)
        } else {
            i++
        }
    }
    sort(arr, lo, lt - 1)
    sort(arr, gt + 1, hi)
}

function exchange(arr, i, j) {
    let temp = arr[j]
    arr[j] = arr[i]
    arr[i] =temp
}

exports.QuickSort = QuickSort