(function () {
    function TabPlugins(tabBox) {
        this.tabBox = tabBox;
        this.init();
    }
    TabPlugins.prototype = {
        constructor: TabPlugins,
        change: function () {
            var _this = this;
            for (var i = 0; i < _this.tabList.length; i++) {
                var item = _this.tabList[i];
                item.myIndex = i;
                item.onclick = function () {
                    //this:当前tab按钮，_this:当前选项卡的实例
                    _this.tabList[_this.prevIndex].className = '';
                    _this.conList[_this.prevIndex].className = '';

                    this.className = 'active';
                    _this.conList[this.myIndex].className = 'active';

                    _this.prevIndex = this.myIndex;
                }
            }
        },
        init: function () {
            var tabBox = this.tabBox;
            var tab = utils.children(tabBox, 'ul')[0];
            this.tabList = utils.children(tab, 'li');
            this.conList = utils.children(tabBox, 'div');
            this.prevIndex = 0;
            this.change();
        }
    }
    window.TabPlugins = TabPlugins;
})()

/**
 * 使用方法
 */
var tabBoxList = utils.getElementsByClassName('tabBox');
for (var i = 0; i < tabBoxList.length; i++) {
    var item = tabBoxList[i];
    new TabPlugins(item);
}


