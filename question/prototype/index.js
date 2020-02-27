var greeting = ["新年快乐", "恭喜发财", "身体健康"];

console.log(greeting instanceof Array);
// true

console.log(greeting.__proto__ === Array.prototype);
// true

// test
const F = function() {};
Object.prototype.a = function() {};
Function.prototype.b = function() {};

var f = new F();
console.log(f.a);
console.log(f.b);
console.log(f.__proto__ === F.prototype);
console.log(F.__proto__ === Function.prototype);
console.log(Function.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(F.prototype.__proto__ === Object.prototype);
console.log(typeof String);


