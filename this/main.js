~function () {


    // this指向的第一种方式
    let obj = {
        name: 'fung',
        getName: ~function(params) {
            // this-->window
           console.log(this); //window
        }() 
    };

    // 第二种方式 
    let box = document.getElementById('box');
    box.onclick = function () {
        // this -- > box
        console.log('box', this); //box对象
    }

    // 第三种  有没有点
    var objTest = {
        name: 'fung',
        getName: function () {
            console.log('objTest', this);
        },
        timeout: function(params) {
            setTimeout(function(){
                //this --> window
                console.log('setTimeout', this);
            }, 1000);
        }
    };
    objTest.getName(); //this --> objTest
    let fn = objTest.getName;
    fn(); // this --> window

    // 第四种  构造函数模式中
    function Person(name, age, sex) {
        //this --> person(Person类的实例person)
        this.name = name;
        this.age = age;
        this.sex = sex;
        console.log('Person', this);
    }
    let person = new Person('fung', 19, 'femail');

    // 第五种 setTimeout
    objTest.timeout();

    // 第六种  call  apply 实现继承的一种方式
    let oldObjec = {
        name: 'oldObjec',
        age: 1000,
        getName: function() {
            console.log('oldObjec getName', this.name);
        }
    };
    let newObjec = {
        name: 'newObjec',
        age: 00,
        getAge: function () {
            console.log('newObjec getAge', this.age);
        }
    };
    let name = 'window';
    oldObjec.getName.call(newObjec); //输出newObjec,说明this指向的是newObjec
    newObjec.getAge.call(oldObjec);//输出1000， 说明this指向的是oldObjec

    // 第七种 箭头函数  箭头函数体中的this对象就是定义时所在的对象，而不是使用时所在的对象
    var age = 111;
    function getName () {
        setTimeout(() => {
            console.log('arrowObjec getName', this.age);
        }, 1000);
    }
    getName.call({age: 2000});

}()