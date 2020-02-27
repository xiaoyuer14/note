class Observer {
    constructor(data) {
        this.data = data;
        this.observe(this.data);
    }
    observe(data) {
        if(data && typeof data === "object" ) {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
                this.observe(data[key]);
            });
        }
    }
    defineReactive(data, key, value) {
        
        let dep = new Dep();
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                // console.log(Dep.target,"--------get");
                Dep.target && dep.addSubs(Dep.target);
                return value;
            },
            set: (newValue) => {
                if(newValue !== value) {
                    this.observe(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        });
    }
}
