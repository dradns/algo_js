class DirectedGraph {
    constructor() {
        this._vertices = new Map();
        this._edges = new Map();
        this._edgesCount = 0;
    }

    /**
     * Adds a vertex to the graph
     * @public
     * @param {number|string} key
     * @param {object} value
     * @return {DirectedGraph}
     */
    addVertex(key, value) {
        this._vertices.set(key, value);
        if (!this._edges.has(key)) {
            this._edges.set(key, new Map());
        }
        return this;
    }

    /**
     * Checks if the graph has a vertex
     * @public
     * @param {number|string} key
     * @return {boolean}
     */
    hasVertex(key) {
        return this._vertices.has(key);
    }

    /**
     * Removes a vertex and all its edges from the graph
     * @public
     * @param {number|string} key
     * @return {boolean}
     */
    removeVertex(key) {
        if (!this.hasVertex(key)) return false;

        this.removeEdges(key);
        this._edges.delete(key);
        this._vertices.delete(key);
        return true;
    }

    /**
     * Returns the number of vertices in the graph
     * @public
     * @return {number}
     */
    getVerticesCount() {
        return this._vertices.size;
    }

    /**
     * Adds a directed edge from a source vertex to a destination
     * @public
     * @param {number|string} srcKey
     * @param {number|string} destKey
     * @param {number} [weight] - default 1
     */
    addEdge(srcKey, destKey, weight) {
        if (!this._vertices.has(srcKey)) {
            throw new Error(`addEdge: vertex "${srcKey}" not found`);
        }

        if (!this._vertices.has(destKey)) {
            throw new Error(`addEdge: vertex "${destKey}" not found`);
        }

        if (weight && Number.isNaN(+weight)) {
            throw new Error('addEdge: expects a numberic weight');
        }

        const w = Number.isNaN(+weight) ? 1 : +weight;
        this._edges.get(srcKey).set(destKey, w);
        this._edgesCount += 1;
        return this;
    }

    /**
     * Checks if there is a direction between two nodes
     * @public
     * @param {number|string} srcKey
     * @param {number|string} destKey
     * @returns {boolean}
     */
    hasEdge(srcKey, destKey) {
        return this.hasVertex(srcKey)
            && this.hasVertex(destKey)
            && this._edges.get(srcKey).has(destKey);
    }

    /**
     * Gets the weight of an edge if exists
     * @public
     * @param {number|string} srcKey
     * @param {number|string} destKey
     * @returns {number}
     */
    getWeight(srcKey, destKey) {
        if (this.hasVertex(srcKey) && srcKey === destKey) {
            return 0;
        }

        if (!this.hasEdge(srcKey, destKey)) {
            return Infinity;
        }

        return this._edges.get(srcKey).get(destKey);
    }

    /**
     * Removes the direction from source to destination
     * @public
     * @param {number|string} srcKey
     * @param {number|string} destKey
     */
    removeEdge(srcKey, destKey) {
        if (!this.hasEdge(srcKey, destKey)) {
            return false;
        }

        this._edges.get(srcKey).delete(destKey);
        this._edgesCount -= 1;
        return true;
    }

    /**
     * Removes in and out directions of a vertex
     * @public
     * @param {number|string} key
     * @return {number} number of removed edges
     */
    removeEdges(key) {
        if (!this.hasVertex(key)) {
            return 0;
        }

        let removedEdgesCount = 0;
        this._edges.forEach((destEdges, srcKey) => {
            if (destEdges.has(key)) {
                this.removeEdge(srcKey, key);
                removedEdgesCount += 1;
            }
        });

        removedEdgesCount += this._edges.get(key).size;
        this._edgesCount -= this._edges.get(key).size;
        this._edges.set(key, new Map());
        return removedEdgesCount;
    }

    /**
     * Returns the number of edges in the graph
     * @public
     * @returns {number}
     */
    getEdgesCount() {
        return this._edgesCount;
    }

    /**
     * Traverse all vertices in the graph using depth-first search
     * @public
     * @param {number|string} srcKey - starting node
     * @param {function} cb
     */
    traverseDfs(srcKey, cb) {
        const traverseDfsRecursive = (key, visited = new Set()) => {
            if (!this.hasVertex(key) || visited.has(key)) return;

            cb(key, this._vertices.get(key));
            visited.add(key);

            this._edges.get(key).forEach((weight, destKey) => {
                traverseDfsRecursive(destKey, visited);
            });
        };
        traverseDfsRecursive(srcKey);
    }

    /**
     * Traverse all vertices in the graph using breadth-first search
     * @public
     * @param {number|string} srcKey - starting node
     * @param {function} cb
     */
    traverseBfs(srcKey, cb) {
        if (!this.hasVertex(srcKey)) return;

        const queue = new Queue([srcKey]);
        const visited = new Set([srcKey]);

        while (!queue.isEmpty()) {
            const nextKey = queue.dequeue();
            cb(nextKey, this._vertices.get(nextKey));
            this._edges.get(nextKey).forEach((weight, destKey) => {
                if (!visited.has(destKey)) {
                    queue.enqueue(destKey);
                    visited.add(destKey);
                }
            });
        }
    }

    /**
     * Clears the graph
     * @public
     */
    clear() {
        this._vertices = new Map();
        this._edges = new Map();
        this._edgesCount = 0;
    }
}

class Graph extends DirectedGraph {
    /**
     * Removes all edges connected to a vertex
     * @public
     * @override
     * @param {number|string} key
     * @return {number} number of removedEdgesCount edges
     */
    removeEdges(key) {
        if (!this.hasVertex(key)) {
            return 0;
        }

        let removedEdgesCount = 0;
        this._edges.get(key).forEach((weight, destKey) => {
            this.removeEdge(destKey, key);
            removedEdgesCount += 1;
        });

        this._edgesCount -= this._edges.get(key).size;
        this._edges.set(key, new Map());
        return removedEdgesCount;
    }

    /**
     * Adds an edge between two existing vertices
     * @public
     * @override
     * @param {number|string} srcKey
     * @param {number|string} destKey
     * @param {number} [weight] - default 1
     */
    addEdge(sourceKey, destKey, weight) {
        super.addEdge(sourceKey, destKey, weight);
        return super.addEdge(destKey, sourceKey, weight);
    }

    /**
     * Removes the connecting edge between two vertices
     * @public
     * @override
     * @param {number|string} srcKey
     * @param {number|string} destKey
     * @returns {boolean}
     */
    removeEdge(sourceKey, destKey) {
        super.removeEdge(sourceKey, destKey);
        return super.removeEdge(destKey, sourceKey);
    }

    /**
     * Gets the number of edges in the graph
     * @public
     * @override
     * @returns {number}
     */
    getEdgesCount() {
        return super.getEdgesCount() / 2;
    }
}

class Heap {
    /**
     * @param {function} compare
     * @param {array} [_values]
     * @param {number|string|object} [_leaf]
     */
    constructor(compare, _values, _leaf) {
        if (typeof compare !== 'function') {
            throw new Error('Heap constructor expects a compare function');
        }
        this._compare = compare;
        this._nodes = Array.isArray(_values) ? _values : [];
        this._leaf = _leaf || null;
    }

    /**
     * Checks if a parent has a left child
     * @private
     */
    _hasLeftChild(parentIndex) {
        const leftChildIndex = (parentIndex * 2) + 1;
        return leftChildIndex < this.size();
    }

    /**
     * Checks if a parent has a right child
     * @private
     */
    _hasRightChild(parentIndex) {
        const rightChildIndex = (parentIndex * 2) + 2;
        return rightChildIndex < this.size();
    }

    /**
     * Compares two nodes
     * @private
     */
    _compareAt(i, j) {
        return this._compare(this._nodes[i], this._nodes[j]);
    }

    /**
     * Swaps two nodes in the heap
     * @private
     */
    _swap(i, j) {
        const temp = this._nodes[i];
        this._nodes[i] = this._nodes[j];
        this._nodes[j] = temp;
    }

    /**
     * Checks if parent and child should be swapped
     * @private
     */
    _shouldSwap(parentIndex, childIndex) {
        if (parentIndex < 0 || parentIndex >= this.size()) {
            return false;
        }

        if (childIndex < 0 || childIndex >= this.size()) {
            return false;
        }

        return this._compareAt(parentIndex, childIndex) > 0;
    }

    /**
     * Compares children of a parent
     * @private
     */
    _compareChildrenOf(parentIndex) {
        if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) {
            return -1;
        }

        const leftChildIndex = (parentIndex * 2) + 1;
        const rightChildIndex = (parentIndex * 2) + 2;

        if (!this._hasLeftChild(parentIndex)) {
            return rightChildIndex;
        }

        if (!this._hasRightChild(parentIndex)) {
            return leftChildIndex;
        }

        const compare = this._compareAt(leftChildIndex, rightChildIndex);
        return compare > 0 ? rightChildIndex : leftChildIndex;
    }

    /**
     * Compares two children before a position
     * @private
     */
    _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
        const compare = this._compareAt(rightChildIndex, leftChildIndex);

        if (compare <= 0 && rightChildIndex < index) {
            return rightChildIndex;
        }

        return leftChildIndex;
    }

    /**
     * Recursively bubbles up a node if it's in a wrong position
     * @private
     */
    _heapifyUp(startIndex) {
        let childIndex = startIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    /**
     * Recursively bubbles down a node if it's in a wrong position
     * @private
     */
    _heapifyDown(startIndex) {
        let parentIndex = startIndex;
        let childIndex = this._compareChildrenOf(parentIndex);

        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildrenOf(parentIndex);
        }
    }

    /**
     * Recursively bubbles down a node before a given index
     * @private
     */
    _heapifyDownUntil(index) {
        let parentIndex = 0;
        let leftChildIndex = 1;
        let rightChildIndex = 2;
        let childIndex;

        while (leftChildIndex < index) {
            childIndex = this._compareChildrenBefore(
                index,
                leftChildIndex,
                rightChildIndex
            );

            if (this._shouldSwap(parentIndex, childIndex)) {
                this._swap(parentIndex, childIndex);
            }

            parentIndex = childIndex;
            leftChildIndex = (parentIndex * 2) + 1;
            rightChildIndex = (parentIndex * 2) + 2;
        }
    }

    /**
     * Inserts a new value into the heap
     * @public
     * @param {number|string|object} value
     * @returns {Heap}
     */
    insert(value) {
        this._nodes.push(value);
        this._heapifyUp(this.size() - 1);
        if (this._leaf === null || this._compare(value, this._leaf) > 0) {
            this._leaf = value;
        }
        return this;
    }

    /**
     * Inserts a new value into the heap
     * @public
     * @param {number|string|object} value
     * @returns {Heap}
     */
    push(value) {
        return this.insert(value);
    }

    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    extractRoot() {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.root();
        this._nodes[0] = this._nodes[this.size() - 1];
        this._nodes.pop();
        this._heapifyDown(0);

        if (root === this._leaf) {
            this._leaf = this.root();
        }

        return root;
    }

    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    pop() {
        return this.extractRoot();
    }

    /**
     * Applies heap sort and return the values sorted by priority
     * @public
     * @returns {array}
     */
    sort() {
        for (let i = this.size() - 1; i > 0; i -= 1) {
            this._swap(0, i);
            this._heapifyDownUntil(i);
        }
        return this._nodes;
    }

    /**
     * Fixes node positions in the heap
     * @public
     * @returns {Heap}
     */
    fix() {
        for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i -= 1) {
            this._heapifyDown(i);
        }
        return this;
    }

    /**
     * Verifies that all heap nodes are in the right position
     * @public
     * @returns {boolean}
     */
    isValid() {
        const isValidRecursive = (parentIndex) => {
            let isValidLeft = true;
            let isValidRight = true;

            if (this._hasLeftChild(parentIndex)) {
                const leftChildIndex = (parentIndex * 2) + 1;
                if (this._compareAt(parentIndex, leftChildIndex) > 0) {
                    return false;
                }
                isValidLeft = isValidRecursive(leftChildIndex);
            }

            if (this._hasRightChild(parentIndex)) {
                const rightChildIndex = (parentIndex * 2) + 2;
                if (this._compareAt(parentIndex, rightChildIndex) > 0) {
                    return false;
                }
                isValidRight = isValidRecursive(rightChildIndex);
            }

            return isValidLeft && isValidRight;
        };

        return isValidRecursive(0);
    }

    /**
     * Returns a shallow copy of the heap
     * @public
     * @returns {Heap}
     */
    clone() {
        return new Heap(this._compare, this._nodes.slice(), this._leaf);
    }

    /**
     * Returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    root() {
        if (this.isEmpty()) {
            return null;
        }

        return this._nodes[0];
    }

    /**
     * Returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    top() {
        return this.root();
    }

    /**
     * Returns a leaf node in the heap
     * @public
     * @returns {number|string|object}
     */
    leaf() {
        return this._leaf;
    }

    /**
     * Returns the number of nodes in the heap
     * @public
     * @returns {number}
     */
    size() {
        return this._nodes.length;
    }

    /**
     * Checks if the heap is empty
     * @public
     * @returns {boolean}
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Clears the heap
     * @public
     */
    clear() {
        this._nodes = [];
        this._leaf = null;
    }

    /**
     * Builds a heap from a array of values
     * @public
     * @static
     * @param {array} values
     * @param {function} compare
     * @returns {Heap}
     */
    static heapify(values, compare) {
        if (!Array.isArray(values)) {
            throw new Error('Heap.heapify expects an array of values');
        }

        if (typeof compare !== 'function') {
            throw new Error('Heap.heapify expects a compare function');
        }

        return new Heap(compare, values).fix();
    }

    /**
     * Checks if a list of values is a valid heap
     * @public
     * @static
     * @param {array} values
     * @param {function} compare
     * @returns {boolean}
     */
    static isHeapified(values, compare) {
        return new Heap(compare, values).isValid();
    }
}

class MinHeap {
    /**
     * @param {function} [getCompareValue]
     * @param {Heap} [_heap]
     */
    constructor(getCompareValue, _heap) {
        this._getCompareValue = getCompareValue;
        this._heap = _heap || new Heap(getMinCompare(getCompareValue));
    }

    /**
     * Inserts a new value into the heap
     * @public
     * @param {number|string|object} value
     * @returns {MinHeap}
     */
    insert(value) {
        return this._heap.insert(value);
    }

    /**
     * Inserts a new value into the heap
     * @public
     * @param {number|string|object} value
     * @returns {Heap}
     */
    push(value) {
        return this.insert(value);
    }

    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    extractRoot() {
        return this._heap.extractRoot();
    }

    /**
     * Removes and returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    pop() {
        return this.extractRoot();
    }

    /**
     * Applies heap sort and return the values sorted by priority
     * @public
     * @returns {array}
     */
    sort() {
        return this._heap.sort();
    }

    /**
     * Fixes node positions in the heap
     * @public
     * @returns {MinHeap}
     */
    fix() {
        return this._heap.fix();
    }

    /**
     * Verifies that all heap nodes are in the right position
     * @public
     * @returns {boolean}
     */
    isValid() {
        return this._heap.isValid();
    }

    /**
     * Returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    root() {
        return this._heap.root();
    }

    /**
     * Returns the root node in the heap
     * @public
     * @returns {number|string|object}
     */
    top() {
        return this.root();
    }

    /**
     * Returns a leaf node in the heap
     * @public
     * @returns {number|string|object}
     */
    leaf() {
        return this._heap.leaf();
    }

    /**
     * Returns the number of nodes in the heap
     * @public
     * @returns {number}
     */
    size() {
        return this._heap.size();
    }

    /**
     * Checks if the heap is empty
     * @public
     * @returns {boolean}
     */
    isEmpty() {
        return this._heap.isEmpty();
    }

    /**
     * Clears the heap
     * @public
     */
    clear() {
        this._heap.clear();
    }

    /**
     * Returns a shallow copy of the MinHeap
     * @public
     * @returns {MinHeap}
     */
    clone() {
        return new MinHeap(this._getCompareValue, this._heap.clone());
    }

    /**
     * Builds a MinHeap from an array
     * @public
     * @static
     * @param {array} values
     * @param {function} [getCompareValue]
     * @returns {MinHeap}
     */
    static heapify(values, getCompareValue) {
        if (!Array.isArray(values)) {
            throw new Error('MinHeap.heapify expects an array');
        }
        const heap = new Heap(getMinCompare(getCompareValue), values);
        return new MinHeap(getCompareValue, heap).fix();
    }

    /**
     * Checks if a list of values is a valid min heap
     * @public
     * @static
     * @param {array} values
     * @param {function} [getCompareValue]
     * @returns {boolean}
     */
    static isHeapified(values, getCompareValue) {
        const heap = new Heap(getMinCompare(getCompareValue), values);
        return new MinHeap(getCompareValue, heap).isValid();
    }
}

const getMinCompare = (getCompareValue) => (a, b) => {
    const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
    const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
    return aVal < bVal ? -1 : 1;
};

/**
 * @class MinPriorityQueue
 */
class MinPriorityQueue {
    constructor(getCompareValue, _heap) {
        if (getCompareValue && typeof getCompareValue !== 'function') {
            throw new Error('MinPriorityQueue constructor requires a callback for object values');
        }
        this._heap = _heap || new MinHeap(getCompareValue);
    }

    /**
     * Returns an element with highest priority in the queue
     * @public
     * @returns {number|string|object}
     */
    front() {
        return this._heap.root();
    }

    /**
     * Returns an element with lowest priority in the queue
     * @public
     * @returns {number|string|object}
     */
    back() {
        return this._heap.leaf();
    }

    /**
     * Adds a value to the queue
     * @public
     * @param {number|string|object} value
     * @returns {MinPriorityQueue}
     */
    enqueue(value) {
        return this._heap.insert(value);
    }

    /**
     * Adds a value to the queue
     * @public
     * @param {number|string|object} value
     * @returns {MinPriorityQueue}
     */
    push(value) {
        return this.enqueue(value);
    }

    /**
     * Removes and returns an element with highest priority in the queue
     * @public
     * @returns {number|string|object}
     */
    dequeue() {
        return this._heap.extractRoot();
    }

    /**
     * Removes and returns an element with highest priority in the queue
     * @public
     * @returns {number|string|object}
     */
    pop() {
        return this.dequeue();
    }

    /**
     * Returns the number of elements in the queue
     * @public
     * @returns {number}
     */
    size() {
        return this._heap.size();
    }

    /**
     * Checks if the queue is empty
     * @public
     * @returns {boolean}
     */
    isEmpty() {
        return this._heap.isEmpty();
    }

    /**
     * Clears the queue
     * @public
     */
    clear() {
        this._heap.clear();
    }

    /**
     * Returns a sorted list of elements from highest to lowest priority
     * @public
     * @returns {array}
     */
    toArray() {
        return this._heap.clone().sort().reverse();
    }

    /**
     * Creates a priority queue from an existing array
     * @public
     * @static
     * @returns {MinPriorityQueue}
     */
    static fromArray(values, getCompareValue) {
        const heap = new Heap(getMinCompare(getCompareValue), values);
        return new MinPriorityQueue(
            getCompareValue,
            new MinHeap(getCompareValue, heap).fix()
        );
    }
}

// let queue = new MinPriorityQueue;
// queue.push(1);
// queue.push(2);
// queue.push(3);
// queue.push(-4);
//
// console.log(queue.size() + ' queue size 1');
// console.log(queue.pop() + " queue first elem pop");
// console.log(queue.size() + ' queue size 2');

// You are given a network of n nodes, labeled from 1 to n.
// You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
// We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

let times = [[2,1,44],[2,3,55],[3,4,66]];
let n = 4;
let k = 2;

var networkDelayTime = function(times, n, k) {
    let digraph = new DirectedGraph();

    //построить мин приорити кью
    let queue = new MinPriorityQueue;

    //построить DAT for visited nodes
    let dat = new Array(n);
    //заполняем DAT фолсами
    for (let i = 0; i < n; i++){
        dat[i] = false;
    }

    // построить взвешенный граф
    for (let i = 1; i <= n; i++){
        // console.log(digraph.hasVertex(i));
        digraph.addVertex(i,i);
        // console.log(digraph.getVerticesCount());
        // console.log(digraph.hasVertex(i));
    }

    for (let i = 0; i < times.length; i++){
        digraph.addEdge(times[i][0],times[i][1],times[i][2]);
        // console.log(digraph.getEdgesCount() + " vertices count");
    }

    // console.log(digraph.hasEdge(2,1) + " should return true");
    // console.log(digraph.hasEdge(2,99) + " should return false");


    dat.forEach(element => console.log(element));

};

networkDelayTime(times, n, k);