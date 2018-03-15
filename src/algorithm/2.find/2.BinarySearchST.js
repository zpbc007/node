class Search {
    constructor () {
        this.keyArr = []
        this.valArr = []
        this.N = 0
    }

    size () {
        return this.N
    }

    isEmpty () {
        return this.size() === 0
    }

    get (key) {
        if (this.isEmpty()) {
            return null
        }
        let i = this.rank(key)
        if (i < this.N && this.keyArr[i] === key) {
            return this.valArr[i]
        } else {
            return null
        }
    }

    put (key, value) {
        let i = this.rank(key)
        if (i < this.N && this.keyArr[i] === key) {
            this.valArr[i] = value
        } else {
            for (let j = this.N; j > i; j--) {
                this.keyArr[j] = this.keyArr[j - 1]
                this.valArr[j] = this.valArr[j - 1]
            }
            this.keyArr[i] = key
            this.valArr[i] = value
            this.N++
        }
    }

    // 递归实现
    // rank (key, lo, hi) {
    //     if (typeof lo === 'undefined' || typeof hi === 'undefined') {
    //         lo = 0
    //         hi = this.N - 1
    //     }
    //     if (hi < lo) return lo
    //     let mid = Math.ceil(lo + (hi - lo) / 2),
    //         midKey = this.keyArr[mid]
        
    //     if (key === midKey) {
    //         return mid
    //     } else if (key > midKey) {
    //         return this.rank(key, mid + 1, hi)
    //     } else {
    //         return this.rank(key, lo, mid - 1)
    //     }
    // }

    // 非递归实现
    rank (key) {
        let lo = 0,
            hi = this.N - 1

        while (lo <= hi) {
            let mid = Math.ceil(lo + (hi - lo) / 2),
                midKey = this.keyArr[mid]

            if (key === midKey) {
                return mid
            } else if (key > midKey) {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return lo
    }

    contains (key) {
        return this.get(key) !== null
    }

    keys () {
        let result = []
        for (let key of this.keyArr) {
            result.push(key)
        }
        return result
    }
}

exports.Search = Search