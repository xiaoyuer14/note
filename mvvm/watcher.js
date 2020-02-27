class Watcher {
    // vm.$watch(vm,key,cb
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // 是否变化，需要一个老值进行比较
        // 为了能在发布时触发watcher的update，将new watcher时执行构造函数返回的实例watcher挂在在Dep上
        // getVal时触发defineProperty的get方法，get中执行Dep的订阅addSubs
        // 取值结束时删除target
        Dep.target = this; 
        this.oldValue = this.getVal(this.vm.$data, expr);
        Dep.target = null;
    }
    getVal(data, expr) {
        return expr.split(".").reduce((prev,next) => {
            return prev[next];
        }, data);
    }
    // 暴露update方法来执行callback
    update() {
        // 比较值是否发生变化，若变化则调用回调函数
        let value = this.getVal(this.vm.$data, this.expr);
        let { oldValue, cb } = this;
        if(value !== oldValue) {
            cb && cb(value);
        }
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }
    addSubs(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        console.log("notify:",this.subs);
        this.subs.forEach(watcher => watcher.update());
    }
}