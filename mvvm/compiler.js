class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        
        // 1、创建文档碎片，在内存中存储dom元素
        let fragment = this.dom2fragment();
        // 2、编译 提取元素节点和文本节点
        this.compile(fragment);
        // 3、把编译好的文档碎片塞回页面
        this.el.appendChild(fragment);
    }
    // 核心方法
    compile(fragment) {
        Array.from(fragment.childNodes).forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElement(child);
                this.compile(child);
            }else{
                this.compileText(child);
            }
        })
    }
    compileElement(node) {
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            let {name, value} = attr;
            if(this.isDirective(name)){
                let [directiveName, eventName] = name.slice(2).split(":");
                CompilerUtil[directiveName](node, this.vm, value, eventName);
            }
        });
    }
    // {{a}} {{b.c}} - {{d}}
    compileText(node) {
        let expr = node.textContent;
        let reg = /\{\{(.+?)\}\}/g;
        if(reg.test(expr)) {
            CompilerUtil["text"](node, this.vm, expr);
        }
    }
    dom2fragment() {
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = this.el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    // 辅助方法
    isElementNode(el) {
        return el.nodeType === 1;
    }
    isDirective(name) {
        return name.startsWith("v-");
    }
}
CompilerUtil = {
    getVal(data, expr) {
        return expr.split(".").reduce((prev, next) => {
            return prev[next];
        }, data);
    },
    setVal(data, expr, value) {
        expr.split(".").reduce((prev, next, currentIndex, arr) => {
            if(currentIndex === arr.length-1) {
                return prev[next] = value;
            }
            return prev[next];
        }, data);
    },
    getTextValue(data, expr) {
        let reg = /\{\{(.+?)\}\}/gi;
        
        return expr.replace(reg,(...arguments) => {
            return this.getVal(data,arguments[1]);
        });
    },
    on(node, vm, methodName, event) {
        node.addEventListener(event, (e) => {
            vm[methodName].call(vm, e);
        });
    },
    model(node, vm, expr) {
        let updateFn = this.update.modelUpdate;
        let value = this.getVal(vm.$data, expr);
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, newValue);
        });
        node.addEventListener("input", (e) => {
            this.setVal(vm.$data, expr, e.target.value);
        });
        updateFn && updateFn(node, value);
    },
    text(node, vm, expr) {
        let updateFn = this.update.textUpdate;
        // let value = this.getTextValue(vm.$data, expr);

        let reg = /\{\{(.+?)\}\}/gi;
        let textContent = expr.replace(reg,(...arguments) => {

            let value = this.getVal(vm.$data,arguments[1]);
            new Watcher(vm, arguments[1], (value) => {
                updateFn && updateFn(node, value);
            });
            return value;
        });

        updateFn && updateFn(node, textContent);
    },
    html(node, vm, expr) {
        let updateFn = this.update.htmlUpdate;
        let value = this.getVal(vm.$data, expr);
        updateFn && updateFn(node, value);
    },
    update: {
        modelUpdate(node, value) {
            node.value = value;
        },
        textUpdate(node, value) {
            node.textContent = value;
        },
        htmlUpdate(node, value) {
            node.innerHTML = value;
        }
    }
}