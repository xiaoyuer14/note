class Vue {
    constructor(options) {
        this.$data = options.data;
        this.$el = options.el;

        let computed = options.computed;
        let methods = options.methods;

        if(this.$el) {
            // 进行数据劫持
            new Observer(this.$data);

            Object.keys(computed).forEach(key => {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                });
            });

            Object.keys(methods).forEach(key => {
                console.log(key);
                Object.defineProperty(this, key, {
                    get: () => {
                        return methods[key];
                    }
                });
            });

            this.proxyData(this.$data);

            new Compiler(this.$el, this);
        }
    }
    proxyData(data) {
        
        Object.keys(data).forEach(key => {

            Object.defineProperty(this, key, {
                get: () => {

                    return this.$data[key];
                },
                set: (newVal) => {
                    if(newVal !== this.$data[key]) {
                        this.$data[key] = newVal;
                    }
                }
            })
        });
    }
}