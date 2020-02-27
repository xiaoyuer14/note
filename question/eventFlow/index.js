// 事件流
// 捕获 －> 目标 －> 冒泡
function getEl(selector) {
    return document.querySelector(selector);
}
let body = getEl("body");
let parent = getEl(".parent");
let son = getEl(".son");
let btn = getEl(".btn");
let span = getEl(".btn-span");

function printInfo() {
    console.log('我是' + this.getAttribute("data-info"))
}
// Dom 0级 默认事件冒泡
// body.onclick = printInfo;
// parent.onclick = printInfo;
// son.onclick = printInfo;
// btn.onclick = printInfo;
// span.onclick = printInfo;


// Dom 2级 默认事件冒泡
/* 
body.addEventListener("click", printInfo);
parent.addEventListener("click", printInfo);
son.addEventListener("click", printInfo);
btn.addEventListener("click", printInfo);
span.addEventListener("click", printInfo);
 */

//  第三参数设定为true，变为事件捕获
/* 
body.addEventListener("click", printInfo, true);
parent.addEventListener("click", printInfo, true);
son.addEventListener("click", printInfo, true);
btn.addEventListener("click", printInfo), true;
span.addEventListener("click", printInfo, true);
*/

// 测试

body.addEventListener("click", printInfo, false);
parent.addEventListener("click", printInfo, true);
son.addEventListener("click", printInfo, false);
btn.addEventListener("click", printInfo, true);
span.onclick = printInfo;
// body 冒泡
// parent 捕获
// son 冒泡
// btn 捕获
// span 冒泡
// click span:
// parent -> btn -> span -> son -> body