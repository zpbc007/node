import test from 'ava'

test('test', async t => {
    t.plan(1)
    let obj = new TestObj()
    console.log(await obj.read())
    t.pass()
})

class TestObj {
    constructor () {
        this.resolve = null
    }

    read () {
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.resolveFun()
        })
    }

    resolveFun () {
        if (this.resolve) {
            setTimeout(() => {
                this.resolve(1)
            }, 5000)
        }
    }
}