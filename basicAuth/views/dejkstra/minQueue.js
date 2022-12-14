import Heap from "./heap";
import MinHeap from "./heap";

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

module.exports.MinPriorityQueue = MinPriorityQueue;