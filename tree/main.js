~function () {
    let _tree = document.getElementById('tree'),
        nodeSet = '';
    let nodes = [
                    { node: 'A', children: [
                            { node: 'A10', children: [] },
                            { node: 'A11', children: [] },
                            { node: 'A12', children: [] },
                            { node: 'A13', children: [] }
                        ] 
                    },
                    { node: 'B', children: [
                            { node: 'B10', children: [
                            { node: 'B21', children: [] },
                            { node: 'B22', children: [
                                { node: 'B220', children: [] },
                            ] }
                        ] },
                        
                    ] },
                    { node: 'C', children: [
                        { node: 'C10', children: [] },
                        { node: 'C11', children: [] },
                    ] },
                    
                ]; 
    
    function getNode(array, nodeName) {
 
        nodeSet += `<div class="node-wrap node-wrap-${nodeName.toLowerCase()}">`;
        for (let item of array) {
            nodeSet += `<div class='node-item'>${item.node}</div>`;;
            if (item.children.length <= 0) {
                continue;
            }
            getNode(item.children, item.node);
        }
        nodeSet += '</div>';
    }

    getNode(nodes, '');
    _tree.innerHTML = nodeSet;

    //delete outer class
    let children = _tree.children;
    children[0].className = '';

    let nodeItems = _tree.getElementsByClassName('node-item');

    
    for (let i = 0; i < nodeItems.length; i++) {

        nodeItems[i].onmouseover  = function () {
            let _text = this.innerHTML.toLocaleLowerCase();
            let _class = 'node-wrap-' + _text;
            let _curClass = _tree.getElementsByClassName(_class)[0].className;
            if (_curClass && _curClass.indexOf('active') < 0)
                _tree.getElementsByClassName(_class)[0].className += ' active' 
        }
    }
    
}()