// 1
/* 
console.log('question 1:');
setTimeout(() => {
    console.log('1');
    Promise.resolve(3).then(res => console.log(res));
}, 0);

setTimeout(() => {
    console.log('2');
}, 0);
*/
// 1
// 3
// 2
// 两宏任务之间处理微任务队列

// 2
/* 
console.log('question 2:');
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
*/
// script start
// promise1
// promise2
// setTimeout

// 函数调用栈
// task 队列
// 微任务队列
// 解释：在eventloop调度一个宏任务之前，先查看微任务队列是否有未执行的任务。如果有则先执行完所有的微任务；


// 3
/* 
console.log('question 3:');
console.time('start');

setTimeout(function() {
    console.log('2');
}, 10);

new Promise(function(resolve) {
    console.log('3');
    resolve();
    console.log('4');
}).then(function() {
    console.log('5');
    console.timeEnd('start');
});

console.log('6');
console.log('8');

requestAnimationFrame(() => console.log('9'));
*/
// 3
// 4
// 6
// 8
// 5
// start: xxxxxxx
// 9
// 2

// 4
// node中
/* 
console.log('question 4:');
Promise.resolve('promise').then((res) => console.log(res));
process.nextTick(() => console.log('nextTick'));
*/
// nextTick
// promise
// 解释：微任务 process.nextTick()优先级高于Promise.then()

// 5
// node中
/* 
console.log('question 5:');
setTimeout(() => {
    console.log('setTimeout');
},0);
setImmediate(() => {
    console.log('setImmediate');
});
*/
// setTimeout
// setImmediate
// 或者
// setImmediate
// setTimeout
// 解释：setTimeout/setInterval的第二个参数取值（1，2^31-1），不在范围内则初始化为1，
// 故setTimeout(fn,0) === setTimeout(fn, 1)
// setTimeout的回调函数在timer阶段执行，setImmediate的回调函数在check阶段执行
// event loop开始会先检查timer阶段，如果timer前的准备时间大于1ms，满足loop->timer>=1，就执行timer
// 若准备时间小于1ms，则先执行check阶段，下一次event loop执行timer阶段

// 可通过跨阶段包壳的形式控制流程
/* 
const fs = require("fs");
fs.readFile(__dirname, () => {
    setTimeout(() => {
        console.log('setTimeout');
    },0);
    setImmediate(() => {
        console.log('setImmediate');
    });
});
*/
// setImmediate
// setTimeout
// 解释：因为开始执行了I/O阶段，所以check阶段先执行，故结果确定

// 设置延时可以先执行timer阶段的setTimeout
/* 
setTimeout(() => {
    console.log('setTimeout');
},0);
setImmediate(() => {
    console.log('setImmediate');
});
const start = Date.now();
while(Date.now()-start < 10 ){}
*/
// setTimeout
// setImmediate
// 解释：先运行了10毫秒，再执行timer阶段时，可以执行setTimeout的回调函数

// 6
// node中
/* 
console.log('question 6:');
console.time('start');

setTimeout(function() {
    console.log(2);
}, 10);
setImmediate(function() {
    console.log(1);
});

new Promise(function(resolve) {
    console.log(3);
    resolve();
    console.log(4);
}).then(function() {
    console.log(5);
    console.timeEnd('start');
});
console.log(6);
process.nextTick(function() {
    console.log(7);
});
console.log(8);
*/
// requestAnimationFrame(() => console.log('9'));
// 3
// 4
// 6
// 8
// 7
// 5
// start: xxxxxx
// 1
// 2

// 7
/* 
console.log('question 7:');
setTimeout(() => console.log('timeout1'));
setTimeout(() => {
    console.log('timeout2');
    Promise.resolve().then(() => console.log('promise resolve'));
});
setTimeout(() => console.log('timeout3'));
setTimeout(() => console.log('timeout4'));
*/
// 浏览器或nodejs > 11.92
// timeout1
// timeout2
// promise resolve
// timeout3
// timeout4
// nodejs  < 11.92
// timeout1
// timeout2
// timeout3
// timeout4
// promise resolve

// 8
/* 
console.log('question 8:');
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');    
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
*/
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

/* 
console.log('1');
setTimeout(() => {
    console.log('2');
    Promise.resolve(1).then(() => console.log('ok'));
});
setTimeout(() => console.log('3'));
*/
// 1 
// 2
// ok
// 3

/* 
async function async1() {
    console.log('async1 start');
    await async2().then(res => console.log(res));
    console.log('async1 end');
}
async function async2() {
    return new Promise((resolve,reject) => {
        console.log('promise1');
        resolve('promise1 resolve');
    }).then(res => {
        console.log(res);
        console.log('promise2');
        return 'promise2 resolve';
    })
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
}, 0)
async1();
new Promise((resolve,reject) => {
    console.log('promise3');
    resolve();
}).then(() => {
    console.log('promise4');
})
console.log('script end');
*/
// script start
// async1 start
// promise1
// promise3
// script end
// promise1 resolve
// promise2
// promise4
// promise2 resolve return的then到下一个队列中
// async1 end
// setTimeout

// 9
/* 
{
    let a = 0;
    let b = async () => {
        a = a + await 10;
        console.log('2', a);
    }
    b();
    a++;
    console.log('1',a);
    // 1,1
    // 2,10
}
*/

// 10
// promise
/* 
const promise = new Promise((resolve,reject) => {
    console.log('1');
    resolve(5);
    console.log('2');
}).then(val => console.log(val));

promise.then(() => {
    console.log('3');
});

console.log('4');

setTimeout(function(){
    console.log('6');
})
*/
// 1
// 2
// 4
// 5
// 3
// 6

// 11 实现一个Promise.finally
/* 
window.Promise && !('finally' in Promise) && !function() {
    Promise.prototype.finally = function(cb) {
        cb = typeof cb === 'function' ? cb : function() {};

        let Fn = this.constructor;
        
        // 接受状态，返回数据
        let onFulfilled = function(data) {
            // cb可能是异步操作，所以需要通过resolve把返回值包装成promise，等cb执行完再继续执行
            return Fn.resolve(cb()).then(function(){
                return data;
            })
        };

        // 拒绝状态，抛出错误
        let onRejected = function(err) {
            return Fn.resolve(cb()).then(function(){
                throw err;
            })
        };

        return this.then(onFulfilled, onRejected);
    }
}();
// test
const p = new Promise((resolve, reject) => {
    console.info('starting...');
    
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('success') : reject('fail');
    }, 500);
});

console.log('finally正常顺序');
p.then(data => {
    console.log(`%c 正常 resolve:${data}`, 'color:green');
}).catch(err => {
    console.log(`%c 正常 catch:${err}`, 'color:red');
}).finally(() => {
    console.info('正常 finally: complete')
});
*/

/* console.log('finally前置测试');
p.finally(() => {
    console.info('前置 finally: complete')
}).then(data => {
    console.log(`%c 前置 resolve:${data}`, 'color:green');
}).catch(err => {
    console.log(`%c 前置 catch:${err}`, 'color:red');
}); */

// 12 generator
// 实现斐波那契序列
function *fibonacci(current, next) {
    for(;;) {
        [current, next] = [next, current + next];
        yield current;
    }
}
console.time("fibonacci");
// 方法一
// for( let n of fibonacci(0,1)) {
//     if(!isFinite(n)){
//         break;
//     }
//     console.log(n);
// }
// 方法二
let fib = fibonacci(0,1);
for(;;) {
    let temp = fib.next();
    if(!isFinite(temp.value)){
        break;
    }
    console.log(temp.value);
}
console.timeEnd("fibonacci");