(function () {
  /**
   * 当前元素，距离body的左边和上边的偏移量。
   */
  var center = document.getElementById('center'),
    inner = document.getElementById('inner'),
    outer = document.getElementById('outer'),

    objCenter = utils.offset(center);
    console.log(center, JSON.stringify(objCenter));

    objInner = utils.offset(inner);
    console.log(inner, JSON.stringify(objInner));

    objOuter = utils.offset(outer);
    console.log(outer, JSON.stringify(objOuter));
})()