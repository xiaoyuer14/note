// 一、数据类型
    // 字符串类型
    var str:string =  "hello ts!";
    console.log(str);
    // 数字类型
    let num:number = 1;
    console.log(num);
    // 布尔类型
    let flag:boolean = true;
    console.log(flag);
    // 数组类型两种方式
    let arr1:number[]=[1,2,3,4];
    let arr2:Array<number>=[9,8,7,6];
    console.log(arr1,arr2);
    // 元组类型（tuple） 属于数组的一种
    let tup:[number, string] = [123, "asdsa"];
    console.log(tup);
    // 枚举类型 enum
    /* 
        使用自然语言中含义清楚的单词来表示它的每一个值的方法叫枚举方法
        enum 枚举名(){
            标示符[=整型常熟],
            ...
        }; 
    */
    enum Sta{
        success=1,
        fail=0
    }
    let f:Sta=Sta.fail;
    console.log(f);
    // 0

    enum Color{
        red=5,
        yellow=8,
        orange
    };
    let c:Color=Color.orange;
    console.log(c);  // 2  未赋值则返回下标 red=1,则顺延orange＝3

    // 任意类型 any
    let any:any="asd";
    console.log(any);
    any=123;
    console.log(any);

    // null undefined 其他（never类型）的子类型
    let n: number | undefined | null;
    console.log(n=null);
    n=123;
    console.log(n);

    // void类型 表示没有任何类型
    function run():void {
        console.log("run");
    }
    run();

    // never类型  代表从不会出现的值
    // 意味着声明never的变量只能被never类型赋值

    let a:never;
    // a = (() => {
    //     throw new Error("error");
    // })();

// 二、函数
    // 函数定义方法
    // 函数声明
    function newRun():string{
        return "new run!";
    }
    // 匿名函数
    let fun=function():number{
        return 333;
    }
    console.log(newRun());
    console.log(fun());
    // 定义方法传参
    function getInfo(name:string, age:number):string {
        return `年龄:${age},姓名：${name}`
    }
    console.log(getInfo("张三", 40));
    // 无返回
    function fun2():void{
        console.log("no return");
    }
    fun2();
    // 可选参数
    // es5中形参和实参可以不一样，ts中必须一样，如果不一样就必须配置可选参数
    function fun3(name:string, age?:number):string{
        return age? `${name}:${age}` : `${name},年龄不知道`
    }
    console.log(fun3("李四",30));
    console.log(fun3("王五"));
    // 默认参数
    function fun4(name:string, age:number=20):string{
        return age? `${name}:${age}` : `${name},年龄不知道`
    }
    console.log(fun4("赵六"));
    // 剩余参数 扩展符
    function sum(...result:number[]):number {
        return result.reduce((prev,next) => {
            return prev + next
        }, 0)
    }
    console.log(sum(1,3,5,6,7,8,9));
    // 函数重载
    // ts中的重载，通过为同一个函数提供多个函数类型定义来试下多种功能的目的
    // es5中出现同名方法会替换，即重载
    function getInfo1(name:string):string;
    function getInfo1(age:number):string;
    function getInfo1(str:any):any{
        if(typeof str === "string"){
            return `name: ${str}`
        }else{
            return `age:${str}`
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

    class Person{
        protected name:string;  //属性 前面省略关键字public

        private nickName:string = "阿黄";

        constructor(name:string) {   //构造函数，实例化类时触发的方法
            this.name = name;
        }
        run():void{
            console.log(this.nickName + '在运动');
        }
        getName():string{
            return this.name;
        }
        setName(name:string):void{
            this.name = name;
        }
    }
    class NewPerson extends Person{
        constructor(name:string) {
            super(name);
        }
        work():string{
            // console.log(this.nickName); //会报错，但是能正常运行
            return `${this.name}在工作`;
        }
        static printInfo():void{
            console.log('静态方法！');
        }
    }
    let p = new NewPerson("张三");
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

    abstract class Animal {
        public name:string;
        constructor(name:string){
            this.name = name;
        }
        abstract eat():any;
    }
    class Dog extends Animal {
        constructor(name:string){
            super(name);
        }
        // 子类必须实现抽象类的抽象方法eat
        eat() {
            console.log(this.name + '吃骨头！');
        }
    }
    let dog = new Dog("小华华");
    dog.eat();
    
// 四、接口
    /* 
        在面向对象中，接口是一种规范，定义了行为和动作，
        接口不关心这些类的内部数据状态，也不关注类里方法的实现细节，
        只规定类里面必须提供某些方法
        interface 关键字
    */
    // 1、属性接口 ，对json的约束
    // 2、接口可选属性 参数加？
    interface FullName {
        firstName: string;  //接口内定义使用；分号
        secondName: string;
        age?: number;
    }
    function printName(name:FullName):void {
        console.log("printlabel----"+name.firstName + name.secondName);
    }
    let obj = {
        age: 5, 
        firstName:"小",
        secondName:"花花"
    }
    // printName({age: 5, firstName:"小",secondName:"花花"}); //报错
    printName(obj);
    printName({firstName:"小",secondName:"花花"});
    // 3、函数接口 对函数传入的参数进行约束
    interface encrypt {
        (key:string,value:string):string;
    }
    let md5:encrypt=function(key,value) {

        return key+value
    }
    console.log(md5("hehe","add"));
    
    // 4、可索引接口
    // 定义数组的两种方法
    let array1:number[]=[1,2,3];
    let array2:Array<string>=['a','b','v'];
    console.log(array1,array2);
    
    interface Iarr{
        [index:number]:String;
    }
    let array3:Iarr=['ss','xx'];
    console.log(array3);
    interface Iobj{
        [index:string]:any;
    }
    let obj1:Iobj={
        "name": "zhang",
        age: 20
    }
    console.log(obj1);

    // 5、类类型接口  较为常用
    interface NewAnimal{
        name:string;
        eat(food:string):void;
    }
    class Cat implements NewAnimal {
        name:string;
        constructor(name:string){
            this.name=name;
        }
        eat(food:string){
            console.log(`${this.name}吃${food}`);
        }
    }
    let c1=new Cat("小牛");
    c1.eat("小鱼");
    
    // 6、接口的扩展继承
    interface IPerson extends NewAnimal {
        work(work:string):void;
    }
    class Programmer{
        name:string;
        constructor(name:string){
            this.name=name;
        }
        coding(code:string):void{
            console.log(`${this.name}写${code}代码`);
        }
    }
    class CPerson extends Programmer implements IPerson {
        constructor(name:string){
            super(name);
        }
        eat(food:string){
            console.log(`${this.name}爱吃${food}`);
        }
        work(work:string){
            console.log(`${this.name}是${work}`);
        }
    }
    let cperson = new CPerson("小黄");
    cperson.coding("php");    

// 五、泛型
    // 1、泛型接口
    interface ConfigFn{
        <T>(value:T):T;
    }
    let getData:ConfigFn=function<T>(value:T):T{
        return value;
    }
    getData<number>(123);
    getData<string>("asd");

    interface ConfigFn1<T>{
        (value:T):T;
    }
    let myGetData:ConfigFn1<string>=getData;
    myGetData("Asd");

    // 2、泛型类
    class User{
        username:string | undefined;
        password:string | undefined;
    }
    class Article{
        title:string | undefined;
        desc:string | undefined;
        status?:boolean | false;
        constructor(params:{
            title:string | undefined,
            desc:string | undefined,
            status?:boolean | undefined;
        }){
            this.title = params.title;
            this.desc = params.desc;
            this.status = params.status || false;
        }
    }
    class MySqlDb<T>{
        add(info:T):boolean{
            console.log(info);
            return true;
        }
        update(info:T,id:number):boolean{
            console.log(id,":",info);
            return true;
        }
    }
    let uu = new User();
    uu.username = "张伊一";
    uu.password = "20140106";

    let aa = new Article({
        title: "news",
        desc: "新闻内容"
    })
    let db = new MySqlDb<User>();
    db.add(uu);
    let db1 = new MySqlDb<Article>();
    db1.update(aa,12);

    // 综合应用
    /* 
        功能： 定义一个操作数据库的库 支持mysql、mongodb
        要求： 各数据库功能一致，都有add delete get update方法
        注意： 约束统一规范以及代码重用
        解决方案： 约束统一规范则使用接口，代码重用则使用泛型
            1、在面向对象编程中，接口是一种规范的定义，它定义了行为和动作的规范；
            2、泛型就是解决类、接口、方法的复用性
    */
   interface DbI<T>{
       add(info:T):boolean;
       delete(id:number):boolean;
       update(info:T,id:number):boolean;
       get(id:number):any[];
   }
   class OMySql<T> implements DbI<T>{
       add(info: T): boolean {
           console.log(info);
           return true;
       }       
       delete(id: number): boolean {
        console.log(id);
        return true;
       }
       update(info: T, id: number): boolean {
           throw new Error("Method not implemented.");
       }
       get(id: number): any[] {
           throw new Error("Method not implemented.");
       }
   }
   class OMongoDb<T> implements DbI<T>{
       add(info: T): boolean {
           throw new Error("Method not implemented.");
       }       
       delete(id: number): boolean {
           throw new Error("Method not implemented.");
       }
       update(info: T, id: number): boolean {
        console.log(id,":",info);
        return true;
       }
       get(id: number): any[] {
           let list = [
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
       }
   }
   let omysql = new OMySql<Article>();
   omysql.add(aa);
   omysql.delete(16);
   let omongo = new OMongoDb<User>();
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
    function decoratorClass(target:any){
        // target就是当前类
        target.prototype.url = "http://xxx.xxx.com";
    }
    // 装饰器工厂
    function decoratorFactory(params:string){
        return function(target:any) {
            target.prototype.urlFactory = params
        }
    }
    // 属性装饰器 传入两个参数，分别是类和属性名称
    function decoratorAttr(params:String){
        return function(target:any, attrName:string){
            target[attrName] = params;
            console.log(target)
        }
    }
    // 方法装饰器
    /* 
        三个参数：
        1、对于静态成员就是类的构造函数，对于实例成员就是原型对象；
        2、成员的名字；
        3、成员的描述符；
    */
   function decoratorMethod(params:string){
       return function(target:any, methodName:string, desc:any){
            // console.log(desc.value); //方法
            console.log(params);
            // 可修改属性
            target.apiUrl = "方法装饰器修改的apiUrl";
            // 可以重写方法
            // 将原始的run方法改为接收参数，且类型都是string
            let oMethod = desc.value;
            desc.value = function(...args:any[]){
                args = args.map((item) => String(item));
                console.log("*****修改的方法，可以接收参数了*****");
                console.log(args);
                oMethod.apply(this, args);
            }
            
       }
   }
    // 参数装饰器
    /* 
        1、target；2、方法名；3、参数索引
    */
   function decoratorParams(params:string, id:number) {
        return function(target:any, methodName:string, paramIndex: number) {
            console.log("++++++++++++++++++++++++");
            
            console.log(methodName, paramIndex);
            
        }
   }

    @decoratorClass
    @decoratorFactory("这是通过工厂传入的参数")
    class testClass{
        @decoratorAttr("名字叫小花花")
        name:string | undefined;
        constructor(){
        }
        @decoratorMethod("方法传入的参数")
        run():void {
            console.log(this.name);
        }
        getData(@decoratorParams("参数装饰器传入的数据",100) uuid:any, index:number) {
            console.log(uuid,"-----",index);
        }
    }
    let dec:any = new testClass();
    console.log(dec.url);
    console.log(dec.urlFactory);
    console.log(dec.name);
    console.log(dec.apiUrl);
    
    dec.run("你妹",100);
    dec.getData("uuid", 500);
    
    


