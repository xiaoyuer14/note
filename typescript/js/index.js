"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 一、数据类型
// 字符串类型
var str = "hello ts!";
console.log(str);
// 数字类型
var num = 1;
console.log(num);
// 布尔类型
var flag = true;
console.log(flag);
// 数组类型两种方式
var arr1 = [1, 2, 3, 4];
var arr2 = [9, 8, 7, 6];
console.log(arr1, arr2);
// 元组类型（tuple） 属于数组的一种
var tup = [123, "asdsa"];
console.log(tup);
// 枚举类型 enum
/*
    使用自然语言中含义清楚的单词来表示它的每一个值的方法叫枚举方法
    enum 枚举名(){
        标示符[=整型常熟],
        ...
    };
*/
var Sta;
(function (Sta) {
    Sta[Sta["success"] = 1] = "success";
    Sta[Sta["fail"] = 0] = "fail";
})(Sta || (Sta = {}));
var f = Sta.fail;
console.log(f);
// 0
var Color;
(function (Color) {
    Color[Color["red"] = 5] = "red";
    Color[Color["yellow"] = 8] = "yellow";
    Color[Color["orange"] = 9] = "orange";
})(Color || (Color = {}));
;
var c = Color.orange;
console.log(c); // 2  未赋值则返回下标 red=1,则顺延orange＝3
// 任意类型 any
var any = "asd";
console.log(any);
any = 123;
console.log(any);
// null undefined 其他（never类型）的子类型
var n;
console.log(n = null);
n = 123;
console.log(n);
// void类型 表示没有任何类型
function run() {
    console.log("run");
}
run();
// never类型  代表从不会出现的值
// 意味着声明never的变量只能被never类型赋值
var a;
// a = (() => {
//     throw new Error("error");
// })();
// 二、函数
// 函数定义方法
// 函数声明
function newRun() {
    return "new run!";
}
// 匿名函数
var fun = function () {
    return 333;
};
console.log(newRun());
console.log(fun());
// 定义方法传参
function getInfo(name, age) {
    return "\u5E74\u9F84:" + age + ",\u59D3\u540D\uFF1A" + name;
}
console.log(getInfo("张三", 40));
// 无返回
function fun2() {
    console.log("no return");
}
fun2();
// 可选参数
// es5中形参和实参可以不一样，ts中必须一样，如果不一样就必须配置可选参数
function fun3(name, age) {
    return age ? name + ":" + age : name + ",\u5E74\u9F84\u4E0D\u77E5\u9053";
}
console.log(fun3("李四", 30));
console.log(fun3("王五"));
// 默认参数
function fun4(name, age) {
    if (age === void 0) { age = 20; }
    return age ? name + ":" + age : name + ",\u5E74\u9F84\u4E0D\u77E5\u9053";
}
console.log(fun4("赵六"));
// 剩余参数 扩展符
function sum() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    return result.reduce(function (prev, next) {
        return prev + next;
    }, 0);
}
console.log(sum(1, 3, 5, 6, 7, 8, 9));
function getInfo1(str) {
    if (typeof str === "string") {
        return "name: " + str;
    }
    else {
        return "age:" + str;
    }
}
console.log(getInfo1("钱七"));
console.log(getInfo1(30));
// console.log(getInfo1(null)); //ts编译器会报错
// 三、类
/*
    es5中的类的继承
    1、对象冒充 只可继承构造函数的属性和方法
        function Animal() {
        }
        function Dog() {
            Animal.call(this);
        }
    2、原型链继承 既可以继承构造函数的属性和方法也可以继承原型链上的属性和方法
        但实例化子类的时候，没法给父类传参
        function Animal() {
        }
        function Dog() {
        }
        Dog.prototype = new Animal()
    3、原型链＋构造函数的组合继承
        function Animal(name, age) {
        }
        function Dog(name,age) {
            Animal.call(this,name,age);
        }
        //Dog.prototype = new Animal();
        Dog.prototype = Animal.prototype;
        let wang = new Dog("小黄", 5);
*/
/*
    类里的修饰符
    属性不加修饰符，默认共有public
    pubilc      共有，表示在类内外以及子类都可以访问
    private     私有，表示只能在类里可以访问
    protected   保护，在类里及子类中可以访问，类外部不能访问
    
    静态属性、静态方法 static
*/
var Person = /** @class */ (function () {
    function Person(name) {
        this.nickName = "阿黄";
        this.name = name;
    }
    Person.prototype.run = function () {
        console.log(this.nickName + '在运动');
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
var NewPerson = /** @class */ (function (_super) {
    __extends(NewPerson, _super);
    function NewPerson(name) {
        return _super.call(this, name) || this;
    }
    NewPerson.prototype.work = function () {
        // console.log(this.nickName); //会报错，但是能正常运行
        return this.name + "\u5728\u5DE5\u4F5C";
    };
    NewPerson.printInfo = function () {
        console.log('静态方法！');
    };
    return NewPerson;
}(Person));
var p = new NewPerson("张三");
p.run();
p.setName("李四");
p.run();
console.log(p.getName());
console.log(p.work());
NewPerson.printInfo();
// 抽象类
// 继承多态  多态属于继承
// 父类方法不实现，由子类实现，每个子类有不同的展现
// abstract  关键字定义抽象类和抽象方法  抽象方法只能写在抽象类里
// 抽象类不能被实例化，是提供标准，给子类实现方法
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    // 子类必须实现抽象类的抽象方法eat
    Dog.prototype.eat = function () {
        console.log(this.name + '吃骨头！');
    };
    return Dog;
}(Animal));
var dog = new Dog("小华华");
dog.eat();
function printName(name) {
    console.log("printlabel----" + name.firstName + name.secondName);
}
var obj = {
    age: 5,
    firstName: "小",
    secondName: "花花"
};
// printName({age: 5, firstName:"小",secondName:"花花"}); //报错
printName(obj);
printName({ firstName: "小", secondName: "花花" });
var md5 = function (key, value) {
    return key + value;
};
console.log(md5("hehe", "add"));
// 4、可索引接口
// 定义数组的两种方法
var array1 = [1, 2, 3];
var array2 = ['a', 'b', 'v'];
console.log(array1, array2);
var array3 = ['ss', 'xx'];
console.log(array3);
var obj1 = {
    "name": "zhang",
    age: 20
};
console.log(obj1);
var Cat = /** @class */ (function () {
    function Cat(name) {
        this.name = name;
    }
    Cat.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food);
    };
    return Cat;
}());
var c1 = new Cat("小牛");
c1.eat("小鱼");
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (code) {
        console.log(this.name + "\u5199" + code + "\u4EE3\u7801");
    };
    return Programmer;
}());
var CPerson = /** @class */ (function (_super) {
    __extends(CPerson, _super);
    function CPerson(name) {
        return _super.call(this, name) || this;
    }
    CPerson.prototype.eat = function (food) {
        console.log(this.name + "\u7231\u5403" + food);
    };
    CPerson.prototype.work = function (work) {
        console.log(this.name + "\u662F" + work);
    };
    return CPerson;
}(Programmer));
var cperson = new CPerson("小黄");
cperson.coding("php");
var getData = function (value) {
    return value;
};
getData(123);
getData("asd");
var myGetData = getData;
myGetData("Asd");
// 2、泛型类
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Article = /** @class */ (function () {
    function Article(params) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status || false;
    }
    return Article;
}());
var MySqlDb = /** @class */ (function () {
    function MySqlDb() {
    }
    MySqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MySqlDb.prototype.update = function (info, id) {
        console.log(id, ":", info);
        return true;
    };
    return MySqlDb;
}());
var uu = new User();
uu.username = "张伊一";
uu.password = "20140106";
var aa = new Article({
    title: "news",
    desc: "新闻内容"
});
var db = new MySqlDb();
db.add(uu);
var db1 = new MySqlDb();
db1.update(aa, 12);
var OMySql = /** @class */ (function () {
    function OMySql() {
    }
    OMySql.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    OMySql.prototype.delete = function (id) {
        console.log(id);
        return true;
    };
    OMySql.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    OMySql.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return OMySql;
}());
var OMongoDb = /** @class */ (function () {
    function OMongoDb() {
    }
    OMongoDb.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    OMongoDb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    OMongoDb.prototype.update = function (info, id) {
        console.log(id, ":", info);
        return true;
    };
    OMongoDb.prototype.get = function (id) {
        var list = [
            {
                title: "assad",
                desc: "VNNBNBNB"
            },
            {
                title: "assad",
                desc: "VNNBNBNB"
            }
        ];
        return list;
    };
    return OMongoDb;
}());
var omysql = new OMySql();
omysql.add(aa);
omysql.delete(16);
var omongo = new OMongoDb();
console.log(omongo.get(4));
omongo.update(uu, 20);
// 六、装饰器
/*
     装饰器是一种特殊类型的声明，它能够附加到类声明、方法、属性或参数上，可以修改类的行为
     通俗讲，装饰器就是一个方法，可以注入到类、方法、属性和参数上扩展它们的功能；
     分为：类装饰器、方法装饰器、属性装饰器、参数装饰器
     写法分为普通装饰器（无法传参）和装饰器工厂（可以传参）
     多个装饰器可叠加，执行顺序如下
     属性－>方法－>参数－>类
     同种装饰器从后向前执行
*/
// 1、类装饰器，在类声明前被声明，应用于类构造函数，可以用来监视修改或替换类定义
// 普通装饰器
function decoratorClass(target) {
    // target就是当前类
    target.prototype.url = "http://xxx.xxx.com";
}
// 装饰器工厂
function decoratorFactory(params) {
    return function (target) {
        target.prototype.urlFactory = params;
    };
}
// 属性装饰器 传入两个参数，分别是类和属性名称
function decoratorAttr(params) {
    return function (target, attrName) {
        target[attrName] = params;
        console.log(target);
    };
}
// 方法装饰器
/*
    三个参数：
    1、对于静态成员就是类的构造函数，对于实例成员就是原型对象；
    2、成员的名字；
    3、成员的描述符；
*/
function decoratorMethod(params) {
    return function (target, methodName, desc) {
        // console.log(desc.value); //方法
        console.log(params);
        // 可修改属性
        target.apiUrl = "方法装饰器修改的apiUrl";
        // 可以重写方法
        // 将原始的run方法改为接收参数，且类型都是string
        var oMethod = desc.value;
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return String(item); });
            console.log("*****修改的方法，可以接收参数了*****");
            console.log(args);
            oMethod.apply(this, args);
        };
    };
}
// 参数装饰器
/*
    1、target；2、方法名；3、参数索引
*/
function decoratorParams(params, id) {
    return function (target, methodName, paramIndex) {
        console.log("++++++++++++++++++++++++");
        console.log(methodName, paramIndex);
    };
}
var testClass = /** @class */ (function () {
    function testClass() {
    }
    testClass.prototype.run = function () {
        console.log(this.name);
    };
    testClass.prototype.getData = function (uuid, index) {
        console.log(uuid, "-----", index);
    };
    __decorate([
        decoratorAttr("名字叫小花花")
    ], testClass.prototype, "name", void 0);
    __decorate([
        decoratorMethod("方法传入的参数")
    ], testClass.prototype, "run", null);
    __decorate([
        __param(0, decoratorParams("参数装饰器传入的数据", 100))
    ], testClass.prototype, "getData", null);
    testClass = __decorate([
        decoratorClass,
        decoratorFactory("这是通过工厂传入的参数")
    ], testClass);
    return testClass;
}());
var dec = new testClass();
console.log(dec.url);
console.log(dec.urlFactory);
console.log(dec.name);
console.log(dec.apiUrl);
dec.run("你妹", 100);
dec.getData("uuid", 500);
