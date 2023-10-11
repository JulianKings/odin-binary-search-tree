class Tree {
    constructor(array)
    {
        this.buildTree(array);
    }

    cleanupArray (array)
    {
        let cleanArray = [];
        for(let i = 0; i < array.length; i++)
        {
            if(!cleanArray.includes(array[i]))
            {
                cleanArray.push(array[i]);
            }
        }
        return cleanArray;
    }

    buildTree (array)
    {
        let sortedArray = mergeSort(this.cleanupArray(array));

        this.root = this.buildBranch(sortedArray);        
    }

    buildBranch (array)
    {
        if(array.length == 1)
        {
            return new Node(array[0]);
        }

        let middleArray = (Math.floor(array.length/2));
        let currentNode = new Node(array[middleArray]);
        currentNode.left = this.buildBranch(array.slice(0, middleArray));

        if(middleArray+1 < array.length)
        {
            currentNode.right = this.buildBranch(array.slice(middleArray + 1, array.length));
        }

        return currentNode;
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    prettyPrintMe ()
    {
        return this.prettyPrint(this.root);
    }

    find (value)
    {
        return this.findTraversal(value, this.root);
    }

    findTraversal (value, node)
    {
        if(node.data === value)
        {
            return node;
        }

        if(node.data < value)
        {
            // look in the right
            if(node.right !== null)
            {
                return this.findTraversal(value, node.right);
            }
        } else {
            // look in the left
            if(node.left !== null)
            {
                return this.findTraversal(value, node.left);
            }
        }

        return null;

    }

    findParent (value)
    {
        if(!this.find(value))
        {
            return null;
        }

        return this.findParentTraversal(value, this.root);
    }

    findParentTraversal (value, node)
    {
        if(node.right !== null)
        {
            if(node.right.data === value)
            {
                return node;
            }
        } 
        
        if(node.left !== null)
        {
            if(node.left.data === value)
            {
                return node;
            }
        }

        if(node.data < value)
        {
            // look in the right
            if(node.right !== null)
            {
                return this.findParentTraversal(value, node.right);
            }
        } else {
            // look in the left
            if(node.left !== null)
            {
                return this.findParentTraversal(value, node.left);
            }
        }

        return null;

    }

    insert (value)
    {
        if(this.find(value))
        {
            return;
        }
        
        this.recursiveInsert(value, this.root);
    }

    recursiveInsert (value, node)
    {
        if(+(node.data) < +(value))
        {
            if(node.right !== null)
            {
                this.recursiveInsert(value, node.right);
            } else {
                let currentNode = new Node(value);
                node.updateRight(currentNode);
                return currentNode;
            }
        } else {
            if(node.left !== null)
            {
                this.recursiveInsert(value, node.left);
            } else {
                let currentNode = new Node(value);
                node.updateLeft(currentNode);
                return currentNode;
            }
        }
    }

    collectChildren (value)
    {
        if(!this.find(value))
        {
            return null;
        }

        let childrenArray = [];
        this.recursiveCollectChildren(childrenArray, this.find(value));

        return childrenArray;
    }

    recursiveCollectChildren (array, node)
    {
        if(node.left !== null)
        {
            array.push(node.left.data);
            this.recursiveCollectChildren(array, node.left);
        }

        if(node.right !== null)
        {
            array.push(node.right.data);
            this.recursiveCollectChildren(array, node.right);
        }
    }

    delete (value)
    {
        if(!this.find(value))
        {
            return null;
        }

        this.recursiveDelete(value, this.root);
    }

    recursiveDelete(value, node)
    {
        if(node.data === value)
        {
            // reorganize the tree
            if(node.right === null && node.left === null)
            {
                let nodeParent = this.findParent(value);
                if(nodeParent.data < value)
                {
                    nodeParent.right = null;
                } else {
                    nodeParent.left = null;
                }
                return nodeParent;
            } else {
                let children = this.collectChildren(node.data);
                if(children !== null && children.length > 0)
                {
                    let sortedChildren = mergeSort(children);
                    let childrenTree = this.buildBranch(sortedChildren);
                    if(this.root.data === value)
                    {
                        this.root = childrenTree;
                        return this.root;
                    } else {
                        let nodeParent = this.findParent(value);
                        if(nodeParent.data < value)
                        {
                            nodeParent.right = childrenTree;
                        } else {
                            nodeParent.left = childrenTree;
                        }
                        return nodeParent;
                    }
                }
            }
        } else if(node.data < value)
        {
            if(node.right !== null)
            {
                this.recursiveDelete(value, node.right);
            }
        } else {
            if(node.left !== null)
            {
                this.recursiveDelete(value, node.left);
            }
        }

    }

    levelOrder (callback = null)
    {
        const levelArray = [];
        this.runQueue(((!callback) ? ((node) => {
            levelArray.push(node.data);
        }) : (callback)), this.root, []);

        if(!callback)
        {
            return levelArray;
        }
    }

    runQueue (callback, next, queue)
    {
        if(!next)
        {
            return;
        }

        callback(next);
        if(next.left !== null)
        {
            queue.push(next.left);
        }

        if(next.right !== null)
        {
            queue.push(next.right);
        }

        let nextElement = queue.shift();
        this.runQueue(callback, nextElement, queue);
        
    }

    inorder (callback = null)
    {
        if(!callback)
        {
            let recursionArray = [];
            const recursionPush = (node) => {
                recursionArray.push(node.data);
            };            
            this.inorderRecursion(recursionPush, this.root);
            return recursionArray;
        } else {
            this.inorderRecursion(callback, this.root);
        }
    }

    inorderRecursion (callback, node)
    {
        if(node.left !== null)
        {
            this.inorderRecursion(callback, node.left);
        }
        callback(node);
        if(node.right !== null)
        {
            this.inorderRecursion(callback, node.right);
        }

    }

    preorder (callback = null)
    {
        if(!callback)
        {
            let recursionArray = [];
            const recursionPush = (node) => {
                recursionArray.push(node.data);
            };
            this.preorderRecursion(recursionPush, this.root);
            return recursionArray;
        } else {
            this.preorderRecursion(callback, this.root);
        }
    }

    preorderRecursion (callback, node)
    {
        callback(node);
        if(node.left !== null)
        {
            this.preorderRecursion(callback, node.left);
        }
        if(node.right !== null)
        {
            this.preorderRecursion(callback, node.right);
        }

    }

    postorder (callback = null)
    {
        if(!callback)
        {
            let recursionArray = [];
            const recursionPush = (node) => {
                recursionArray.push(node.data);
            };
            this.postorderRecursion(recursionPush, this.root);
            return recursionArray;
        } else {
            this.postorderRecursion(callback, this.root);
        }
    }

    postorderRecursion (callback, node)
    {
        if(node.left !== null)
        {
            this.postorderRecursion(callback, node.left);
        }
        if(node.right !== null)
        {
            this.postorderRecursion(callback, node.right);
        }
        callback(node);
    }

    height (node)
    {
        return this.heightRecursion(node);
    }

    heightRecursion (node, cHeight = 0)
    {
        if(!node.left && !node.right)
        {
            return cHeight;
        }

        cHeight += 1;
        let updatedHeight = 0;

        if(node.left !== null)
        {
            let increaseHeight = this.heightRecursion(node.left, cHeight);
            if(increaseHeight > updatedHeight)
            {
                updatedHeight = increaseHeight;
            }
        }

        if(node.right !== null)
        {
            let increaseHeight = this.heightRecursion(node.right, cHeight);
            if(increaseHeight > updatedHeight)
            {
                updatedHeight = increaseHeight;
            }
        }

        return updatedHeight;
    }

    depth (node)
    {
        return this.depthRecursion(node);
    }

    depthRecursion (node, currentDepth = 0)
    {
        if(!this.findParent(node.data))
        {
            return currentDepth;
        }

        currentDepth += 1;
        return this.depthRecursion(this.findParent(node.data), currentDepth);
    }

    isBalanced ()
    {
        let balanced = true;
        let baseHeight = this.height(this.root);
        const checkOrder = (node) => {
            let currentHeight = this.height(node);
            if((baseHeight - currentHeight) === 1)
            {
                baseHeight = currentHeight;
            }

            if((baseHeight - currentHeight) > 1)
            {
                balanced = false;
            }
        }
        this.levelOrder(checkOrder);

        return balanced;
    }

    rebalance ()
    {
        this.buildTree(this.inorder());
    }
}