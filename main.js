const getRandom = (max) => Math.floor(Math.random() * (max + 1));

const populateRandomArray = (size) =>
{
    const arr = [];
    for(let i = 0; i < size; i++)
    {
        arr.push(getRandom(100));
    }
    return arr;
};

const printNode = (node) => 
{
    console.log("NODE => " + node.data);
};

const testTree = new Tree(populateRandomArray(12));
testTree.prettyPrintMe();

console.log(`IS BALANCED? ${testTree.isBalanced()}`);
console.log("LEVEL ORDER");
testTree.levelOrder(printNode);
console.log("INORDER");
testTree.inorder(printNode);
console.log("PREORDER");
testTree.preorder(printNode);
console.log("POSTORDER");
testTree.postorder(printNode);

console.log("ADDING 5 MORE LONG NUMBERS...")
testTree.insert(101 + getRandom(100));
testTree.insert(201 + getRandom(100));
testTree.insert(301 + getRandom(100));
testTree.insert(401 + getRandom(100));
testTree.insert(501 + getRandom(100));
testTree.prettyPrintMe();
console.log(`IS BALANCED? ${testTree.isBalanced()}`);

console.log("Rebalancing...");
testTree.rebalance();
console.log("REBALANCED");
testTree.prettyPrintMe();
console.log(`IS BALANCED? ${testTree.isBalanced()}`);
console.log("LEVEL ORDER");
testTree.levelOrder(printNode);
console.log("INORDER");
testTree.inorder(printNode);
console.log("PREORDER");
testTree.preorder(printNode);
console.log("POSTORDER");
testTree.postorder(printNode);
