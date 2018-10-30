~function () {
    let box = document.getElementById('box');
    let fn = () =>{
        //1.计算当前时间和目标时间的差值
        //new Date():获取的是客户端本机时间（会受到客户端自己调整时间的影响），重要的时间参考不能基于这个完成，不管是哪一个客户端都需要基于相同的服务器时间进行计算
        let nowTime = new Date(),
            tarTime = new Date('2017/12/14 13:00:00');
        spanTime = tarTime - nowTime;

        //=>2. 计算差值中包含多少时多少分多少秒
        if(spanTime <= 0){
            // 已经错过了抢购的时间
            clearInterval(autoTimer)
            box.innerHTML = '开枪！'
            return;
        }

        let hour = Math.floor(spanTime/(1000*60*60));
        spanTime -= hour*1000*60*60; 
        let minutes = Math.floor(spanTime/(1000*60));
        spanTime -= minutes*1000*60;
        let second = Math.floor(spanTime);
        hour<10?hour = '0'+hour : null;
        minutes<10? minutes = '0' + minutes : null;
        second < 10 ? second = '0' + second : null;
        box.innerHTML = `${hour}：${minutes}：${second}`
    }
    fn();
    let autoTimer = setInterval(fn, 1000);
}();