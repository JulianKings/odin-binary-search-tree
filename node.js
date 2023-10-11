class Node {
    constructor (value)
    {
        this.data = value;
        this.left = null;
        this.right = null;
    }

    updateRight (node) 
    {
        this.right = node;
    }

    updateLeft (node)
    {
        this.left = node;
    }
}