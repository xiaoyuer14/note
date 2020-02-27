// 基础类
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;
        let methods = options.methods;
        // 这个根元素存在，编译模版
        if(this.$el) {

            // 把数据 全部转化成Object.defineProperty来定义
            new Observer(this.$data);

            for(let key in computed) {
                // reduce取值是$data,故先绑定$data,再通过proxyVm绑定到vm实例
                Object.defineProperty(this.$data, key, {
                    get:() => {
                        // console.log(computed,key);
                        return computed[key].call(this);
                    }
                });
            }

            for(let key in methods) {
                Object.defineProperty(this, key, {
                    get:() => {
                        return methods[key];
                    }
                });
            }

            // 把数据获取操作 vm上的取值都代理到vm.$data
            this.proxyVm(this.$data);

            new Compiler(this.$el,this);
        }
    }
    // 数据代理到$data
    proxyVm(data) {
        for(let key in data) {
            Object.defineProperty(this, key, {
                get:() => {
                    return data[key];
                },
                set: (newVal) => {
                    if(data[key] !== newVal) {
                        data[key] = newVal;
                    }
                }
            })
        }
    }
}

// 观察者 ［发布订阅］ 观察者 被观察者
class Watcher {
    // vm.$watch(vm,"school.name",() => {
    // })
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // 变化调用cb，需要一个老值和新值的比较
        this.oldValue = this.get();
    }
    get() {
        const { vm, expr } = this;
        Dep.target = this;
        // 创建watcher时，将watch保存到全局
        let value = CompileUtil.getVal(vm, expr);
        // console.log(expr);
        Dep.target = null; //不取消，任何取值都会添加watcher
        return value;
    }
    update() {
        // 更新操作 数据变化时会调用观察者的update方法
        const { vm, expr, oldValue } = this;
        let newValue = CompileUtil.getVal(vm, expr);
        
        if(newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}
// 订阅
class Dep {
    // 存放观察者列表，一旦更新，顺序通知观察者
    constructor() {
        this.subs = [];//存放所有的watcher

    }
    // 订阅
    addSub(watcher) {//添加watcher
        this.subs.push(watcher);
    }
    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}

// 数据劫持
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        // 判断是否有值，是否是对象,是对象才观察
        if(data && typeof data == "object") {
            for(let key in data) {
                // this.observer(data[key]); //深度便利，如果是对象，则深层绑定
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(data, key, value) {
        // school: [watcher, watcher] b:[watcher]
        this.observer(value);//深度便利，如果是对象，则深层绑定
        let dep = new Dep(); //给每个属性都加上一个具有发布订阅的功能
        Object.defineProperty(data, key, {
            get(){
                // 创建watcher时，会取到对应的内容，并且把watcher放到全局
                // 取值时绑定订阅
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                // 如果新值是对象，则也需要监控
                if(value !== newVal) {
                    this.observer(newVal);
                    value = newVal;
                    // 设新值时发布，执行回调函数
                    dep.notify();
                }
            }
        })
    }
}

// 编译
class Compiler {
    constructor(el, vm) {
        // 判断el是不是元素，如果不是则获取元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        let fragment = this.node2fragment(this.el);
        console.log(fragment);

        // 把节点中的内容进行替换

        // 编译模版，用数据编译
        this.compile(fragment);
        // 把内容重新塞回页面中

        this.el.appendChild(fragment);
    }
    // 是否v-开头的指令
    isDirective(attrName) {
        return attrName.startsWith("v-");
    }
    // 编译元素
    compileElement(node) {
        let attributes = node.attributes; //类数组

        [...attributes].forEach(attr => {
            // console.log(attr.name)
            let {name, value:expr} = attr;
            if(this.isDirective(name)) {
                // v-model v-html v-bind
                let [,dirctive] = name.split("-");
                // 需要调用不同的指令来处理
                let [dirctiveName, eventName] = dirctive.split(":");
                CompileUtil[dirctiveName](node, expr, this.vm, eventName);
            }
        })
    }
    // 编译文本 判断文本是否包含{{}}
    compileText(node) {
        let content = node.textContent;
        if(/\{\{(.+?)\}\}/g.test(content)) {
            console.log(content);
            CompileUtil['text'](node, content, this.vm);
        }
    }
    // 核心的编译方法
    compile(node) {
        // 编译内存中的dom节点
        let childNodes = node.childNodes;

        [...childNodes].forEach(child => {
            // 判断是否元素还是文本
            if(this.isElementNode(child)) {
                this.compileElement(child);
                // 如果是元素的话，判断子节点
                this.compile(child);
            } else {
                this.compileText(child);
            }
        });
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    node2fragment(node) {
        // 创建文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        // appendChild具有移动性
        // 页面元素移到内存中保存
        while(firstChild = node.firstChild) {
            fragment.appendChild(firstChild);
        }

        return fragment;
    }
}
CompileUtil = {
    getVal(vm, expr) {
        return expr.split(".").reduce((data,current) => {
            return data[current]
        }, vm.$data);
    },
    // 反向向$data中设值
    setVal(vm, expr, value) {
        expr.split(".").reduce((data,current,index,arr) => {
            // school->name
            if(arr.length-1 === index) {
                data[current] = value;
            }
            return data[current]
        }, vm.$data);
    },
    model(node, expr, vm) {
        // node 节点 expr 表达式 vm 当前实例
        let fn = this.updater['modelUpdater'];
        // 给输入框加一个观察者
        new Watcher(vm, expr, (newVal) => {
            fn(node,newVal);
        });
        node.addEventListener('input',(e) => {
           this.setVal(vm, expr, e.target.value); 
        });
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    on(node, expr, vm, eventName) {
        // console.log(arguments);
        node.addEventListener(eventName, (e) => {
            vm[expr].call(vm, e);
        });
    },
    html(node, expr, vm) {
        let fn = this.updater['htmlUpdater'];
        // 给输入框加一个观察者
        new Watcher(vm, expr, (newVal) => {
            fn(node,newVal);
        });
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    getContentValue(vm, expr) {
        // 遍历表达式，将内容重新替换成完整内容
        return expr.replace(/\{\{(.+?)\}\}/gi, (...args) => {
            return this.getVal(vm, args[1]);
        });
    },
    text(node, expr, vm) {
        // expr {{a}}  {{b}}
        let fn = this.updater['textUpdater'];
        // content遍历所有符合的变量名，即大括号中的变量名，取值后返回
        let content = expr.replace(/\{\{(.+?)\}\}/gi, (...args) => {
            /* let name = args[1];
            let value = vm.$data;
            name.split(".").forEach(key => {
                value = value[key]
            })
            return value; */
            
            // 给表达式每个变量大括号都加上观察者
            new Watcher(vm, args[1], (newVal) => {
                // {{a}} {{b}}
                //  必须获取全值替换
                fn(node,this.getContentValue(vm, expr));
            });
            return this.getVal(vm, args[1]);
        });
        fn(node, content);
    },
    updater: {
        modelUpdater(node, value) {
            node.value = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
}