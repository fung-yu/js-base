/**
 * 优化选项卡插件
 * 1.默认可以选择，第一个选项卡被选中
 * 2.可以选择事件类型，mouseover/onclick
 */
(function () {
    function TabPlugins(tabBox, options) {
        this.tabBox = tabBox;
        this._default = {
            selectedTab: 0,
            eventType: 'click'
        };
        for (var key in options) {
            this._default[key] = options[key];
        }
        
        this.init();
    }
    TabPlugins.prototype = {
        constructor: TabPlugins,
        setDefault: function(){
            var selectedTab = this._default.selectedTab;
            for (var i = 0; i < this.tabList.length; i++) {
                this.tabList[i].className = '';
                this.conList[i].className = '';
            }
            this.tabList[selectedTab].className = 'active';
            this.conList[selectedTab].className = 'active';
        },
        change: function () {
            var _this = this;
            for (var i = 0; i < _this.tabList.length; i++) {
                var item = _this.tabList[i];
                item.myIndex = i;
                item['on' + _this._default.eventType] = function () {
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
            this.prevIndex = this._default.selectedTab;
            this.setDefault();
            this.change();
        }
    }
    window.TabPlugins = TabPlugins;
})()

/**
 * 使用方法
 */
var tabBoxList = utils.getElementsByClassName('tabBox');
// for (var i = 0; i < tabBoxList.length; i++) {
//     var item = tabBoxList[i];
//     new TabPlugins(item);
// }

new TabPlugins(tabBoxList[0], {
    selectedTab: 2,
    eventType: 'mousemove'
});

new TabPlugins(tabBoxList[1], {
    selectedTab: 1,
    eventType: 'click'
});

new TabPlugins(tabBoxList[2], {
    selectedTab: 1,
    eventType: 'click'
});