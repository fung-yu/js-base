/**
 * 【控制dialog的显示】
 *    iShow = true
 * 【title】
 *    title是否显示  isTitleShow = true
 *    title内容    title = null
 * 
 * 【按钮】
 *    确定按钮（ok）是否显示  isOkShow = true
 *    确定按钮回调函数 okCallBack = 默认是关闭当前Dialog
 * 
 *    取消按钮（cancel）是否显示 isCancelShow = true
 *    取消按钮回调函数  cancelCallBack = 默认关闭当前Dialog
 * 
 * 【显示内容】
 *      内容是否含有图片   hasImg = true
 *      图片地址          imgUrl = ''
 *      文字内容          content = ''   
 *      
 */
(function () {
    function DialogPlugin(options) {
        var _this = this;
        this._default = {
            iShow: true,
            isTitleShow: true,
            title: '提示',
            hasImg: true,
            imgUrl: './deleteSuccess.png',
            content: '你确定要删除这条内容？',
            isOkShow: true,
            isCancelShow: true,
            outerWin: window.top.document,
            okCallBack: function () {
                _this.hide();
            },
            cancelCallBack: function () {
                _this.hide();
            }
        };

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this._default[key] = options[key];
            }
        }
        this.init();
    }

    DialogPlugin.prototype = {
        constructor: DialogPlugin,

        renderDom: function () {

            var dialogMask = document.createElement('div');
            dialogMask.className = 'dialog-mask';
            dialogMask.id = 'dialogMask';
            this._default.outerWin.body.appendChild(dialogMask);

            var dialogModal = document.createElement('div');
            dialogModal.className = 'dialog-modal';
            dialogModal.id = 'dialogModal';
            this._default.outerWin.body.appendChild(dialogModal);

            // this._default.iShow ? this.show() : this.hide();

            var str = '';
            if (this._default.isTitleShow) {
                str += '<div class="header"><p>' + this._default.title + '</p><a href="javascript:;" class="close" id="close"></a></div>';
            }
            str += '<div class="content">';
            if (this._default.hasImg) {
                str += '<img src="' + this._default.imgUrl + '" />';
            }
            str += '<p>' + this._default.content + '</p>' +
                '</div>';
            if (this._default.isOkShow || this._default.isCancelShow) {
                var footerClass = this._default.isOkShow && this._default.isCancelShow ? 'two-btn' : '';
                str += '<div class="dialog-footer ' + footerClass + '">';
                if (this._default.isCancelShow) {
                    str += '<a href="javascript:;" class="btn cancel" id="cancel">取消</a>';
                }
                if (this._default.isOkShow) {
                    str += '<a href="javascript:;" class="btn ok" id="ok">确定</a>';
                }
                str += '</div>';
            }
            this._default.outerWin.getElementById('dialogModal').innerHTML = str;
        },

        cancel: function () {
            var _this = this;
            this._default.outerWin.getElementById('cancel').onclick = function(){
                _this._default.cancelCallBack();
                _this.hide();
            }
        },

        ok: function () {
            var _this = this;
            this._default.outerWin.getElementById('ok').onclick = function(){
                _this._default.okCallBack();
                _this.hide();
            }
        },
        close: function () {
            var _this = this;
            this._default.outerWin.getElementById('close').onclick = _this.hide;
        },

        /**
         * 公共函数，处理关闭dialog弹窗时的事儿
         * 1.遮罩层不显示
         * 2.dialog弹窗不现实
         * 3.body样式去掉overflow
         * 
         */
        hide: function () {
            this._default.outerWin.getElementById('dialogMask').style.display = 'none';
            this._default.outerWin.getElementById('dialogModal').style.display = 'none';
            this._default.outerWin.body.style.overflow = 'auto';
        },

        show: function () {
            this._default.outerWin.getElementById('dialogMask').style.display = 'block';
            this._default.outerWin.getElementById('dialogModal').style.display = 'block';
            this._default.outerWin.body.style.overflow = 'hidden';
        },

        init: function () {
            //render Dom
            var dialogMask = this._default.outerWin.getElementById('dialogMask'),
                dialogModal = this._default.outerWin.getElementById('dialogModal');
            if (dialogMask) {
                dialogMask.parentNode.removeChild(dialogMask);
                dialogModal.parentNode.removeChild(dialogModal);
            }
            this.renderDom();
            if (this._default.iShow) this.show();

            if (this._default.isCancelShow) this.cancel();

            if (this._default.isOkShow) this.ok();

            if (this._default.isTitleShow) this.close();
        }
    }

    window.DialogPlugin = DialogPlugin;
})()