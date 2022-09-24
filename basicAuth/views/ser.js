class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

var serialize = function(root) {
    var str = "";

    var in_or_trav = function in_or_trav(node){
        if (node === null)
            return;

        str += "(";
        if(node.left)
            in_or_trav(node.left);
        str += ")";

        str += "(" + node.val + ")";

        str += "(";
        if(node.right)
            in_or_trav(node.right);
        str += ")";
    }

    in_or_trav(root);
    return str;
};

var a = new TreeNode("-30");
var b = new TreeNode("4");
var c = new TreeNode("56");
var d = new TreeNode("577");
var e = new TreeNode("9");
var f = new TreeNode("0");

a.left = b;
a.right = c;
b.left = d;
c.left = e;
c.right = f;

var some = serialize(a);//строка

var deserialize = function(str) {
    if (str.length === 0)
        return null;
    var index = 0;

    return getSubtree(str);

    function parseVal(str){
        var temp = "";
        while (str[index] !== ")"){
            temp += str[index];
            index++;
            // console.log(index);
        }
        // console.log(Number(temp));
        return Number(temp);
    }

    function getSubtree(str){
        var node1 = new TreeNode();

        if (str[index] === "("){
            index++;//3
            if (str[index] === ")"){
                node1.left = null;
                index++;
            }else {
                node1.left = getSubtree(str);
                index++;
            }
        }

        index++;//4
        node1.val = parseVal(str);
        index = index+1;//6

        if (str[index] === "("){
            index++;
            if (str[index] === ")"){
                node1.right = null;
                index++;//8
            }else {
                node1.right = getSubtree(str);
                index++;
            }
        }
        return node1;
    }
};

console.log(serialize(a));
console.log(serialize(deserialize(some)));