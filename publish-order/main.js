~function () {
    //each：遍历数组中的每一项
    let each = function (array, callBack) {
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            let result = callBack && callBack(item, i);
            if(result === false){
                //如果执行的回调的函数返回false，代表结束当前正在遍历的操作（仿照JQ中的each语法实现的）
                break;
            }
            if(result === 'DEL') i--;
        }
    }
    class Plan{
        constructor(){
            this.planList = [];//存放方法的容器

        }
        // 挂载到原型上的方法
        add(fn){
            let planList = this.planList;
            let flag = true;
            //去重处理
            each(planList, function(item, index) {
                if(item === fn)
                    flag = false;
                    return flag;
            });
            flag ? planList.push(fn) : null;
        }
        remove(fn){
            let planList = this.planList;
            each(planList, function (item, index) {
                if(item === fn){
                    // 在remove中不能直接删除数组项，这样会改变数组的结构，从而引起数组塌陷问题
                    // planList.splice(index, 1);

                    //这样处理索引在，位置在，但是值不在了
                    planList[index] = null;
                    return false;
                }
            });
        }
        fire(...arg){
            let planList = this.planList;
            each(planList, function(item, index) {
                if(item === null){
                    planList.splice(index, 1);
                    return 'DEL';//说明已经被移除掉了，不再是函数
                }
                item(...arg);
            })
        }
        //=>挂载到Plan对象上的属性和方法
        static Callbacks(){
            return new Plan();
        }
    }
    window.$ = window.Plan = Plan;
}()

let $plan = $.Callbacks();

let fn1 = function () {
    console.log(1, arguments);
}
let fn2 = function () {
    console.log(2, arguments);
}
$plan.add(fn1);
$plan.add(fn2);
$plan.fire();


