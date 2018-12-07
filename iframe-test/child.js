/**
 * 存在跨域问题
 * 在子页面中获取父页面的window对象
 * 父页面：window.parent
 * 适用于所有浏览器
 */
console.log('在子页面中获取父页面的window对象 window.parent', window.parent);
/**
 * 存在跨域问题
 * 在子页面中获取顶层页面
 * 顶层页面：window.top
 * 适用于所有浏览器
 */
console.log('在子页面中获取顶层页面 window.top', window.top);


/**
 * 存在跨域问题
 * 在子页面中获取iframe的html
 * window.frameElement
 * （类型：HTMLElement）
 * 适用于所有浏览器
 */
console.log('child window', window);
console.log('在子页面中iframe获取自己的引用 window.frameElement', window.frameElement);









