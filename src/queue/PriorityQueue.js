/**
 * @module
 * @author Nikita Sushkov
 */
let qCopy = Symbol();
let pq = Symbol();
let num = Symbol();
let swim = Symbol();
let sink = Symbol();
let less = Symbol();
let greater = Symbol();
let exch = Symbol();
let comp = Symbol();
let delTop = Symbol();

/** Class with general operations for priority queue (use as a base class for concrete implementations)*/
class BasePriorityQueue {
    /**
     * Create a queue
     * @param iterable - Iterable which contains initial elements
     */
    constructor(iterable) {
        this[pq] = [null];
        if (iterable) {
            if (iterable[Symbol.iterator]) {
                for (let item of iterable) {
                    this.insert(item);
                }
            } else {
                throw new TypeError('Priority  queue constructor argument should be iterable');
            }
        }
    }

    /**
     * Compare two values (must be implemented in concrete priority queue)
     * @abstract
     * @protected
     * @param m
     * @param n
     * @returns {boolean}
     */
    [comp](m, n) {
        throw new Error('must be implemented by subclass!');
    }

    /**
     * Exchange two items in the internal queue array
     * @protected
     * @param m
     * @param n
     * @returns {boolean}
     */
    [exch](m, n) {
        let N = this[pq].length - 1;
        if ((m < 1) || (m > N) || (n < 1) || (n > N)) {
            return false;
        }
        let mItem = this[pq][m];
        this[pq][m] = this[pq][n];
        this[pq][n] = mItem;
    }

    /**
     * Propagate element upwards to its right position
     * @protected
     * @param k
     */
    [swim](k) {
        while ((k > 1) && this[comp](k / 2, k)) {
            this[exch](k, k / 2);
            k /= 2;
        }
    }

    /**
     * Propagate element downwards to its right position
     * @protected
     * @param k
     */
    [sink](k) {
        let N = this[pq].length - 1;
        while ((2 * k) <= N) {
            let j = 2 * k;
            if (j < N && this[comp](j, j + 1)) {
                j++;
            }
            if (!this[comp](k, j)) {
                break;
            }
            this[exch](k, j);
            k = j;
        }
    }

    /**
     * Remove top element from the queue
     * @protected
     * @returns {*}
     */
    [delTop]() {
        let top = this[pq][1];
        this[exch](1, this[pq].length - 1);
        this[pq].pop();
        this[sink](1);
        return top;
    }

    /**
     * Check if the queue is empty
     * @public
     * @returns {boolean}
     */
    get empty() {
        return this[pq].length === 1;
    }

    /**
     * Get the size of the queue
     * @public
     * @returns {number}
     */
    get size() {
        return this[pq].length - 1;
    }

    /**
     * Insert new element in the queue
     * @public
     * @param x
     */
    insert(x) {
        this[pq].push(x);
        this[swim](this[pq].length - 1);
    }
};

/**
 * Iterator for MaxPriorityQueue
 */
class MaxPriorityQueueIterator {
    constructor(maxPriorityQueue) {
        this[qCopy] = new MaxPriorityQueue();
        this[qCopy][pq] = Array.from(maxPriorityQueue[pq]);
    }

    next() {
        if (this[qCopy].empty) {
            return {done: true};
        }
        return {value: this[qCopy].delMax()};
    }

    [Symbol.iterator]() {
        return this;
    }
};

/**
 * Class representing priority queue with max element on the top
 * @exports MaxPriorityQueue
 */
export class MaxPriorityQueue extends BasePriorityQueue {
    /**
     * Create a MaxPriorityQueue
     * @param iterable
     */
    constructor(iterable) {
        super(iterable);
    }

    /**
     * Check if m is less than n
     * @protected
     * @param m
     * @param n
     * @returns {boolean}
     */
    [less](m, n) {
        if ((m < 1) || (m > this[pq].length - 1) || (n < 1) || (n > this[pq].length - 1)) {
            return false;
        }
        let mItem = this[pq][m];
        let nItem = this[pq][n];
        if (mItem == nItem) {
            return false;
        }
        if (!mItem) {
            return false;
        }
        if (!nItem) {
            return true;
        }
        return mItem < nItem;
    }

    /**
     * Compare implementation via less
     * @protected
     * @param m
     * @param n
     * @returns {*}
     */
    [comp](m, n) {
        return this[less](m, n);
    }

    /**
     * Iterable implementation
     */
    [Symbol.iterator]() {
        return new MaxPriorityQueueIterator(this);
    }

    /**
     * Get the max element
     * @public
     * @returns {*}
     */
    max() {
        if (this.empty) {
            throw new Error('Priority queue underflow');
        }
        return this[pq][1];
    }

    /**
     * Delete the max element
     * @public
     * @returns {*}
     */
    delMax() {
        return this[delTop]();
    }
};

/**
 * Iterator for MinPriorityQueue
 */
class MinPriorityQueueIterator {
    constructor(minPriorityQueue) {
        this[qCopy] = new MinPriorityQueue();
        this[qCopy][pq] = Array.from(minPriorityQueue[pq]);
    }

    next() {
        if (this[qCopy].empty) {
            return {done: true};
        }
        return {value: this[qCopy].delMin()};
    }

    [Symbol.iterator]() {
        return this;
    }
}

/**
 *  Class representing priority queue with min element on the top
 *  @exports MinPriorityQueue
 */
export class MinPriorityQueue extends BasePriorityQueue {
    /**
     * Create a MinPriorityQueue
     * @param iterable
     */
    constructor(iterable) {
        super(iterable);
    }

    /**
     * Check if m is greater than n
     * @protected
     * @param m
     * @param n
     * @returns {boolean}
     */
    [greater](m, n) {
        if ((m < 1) || (m > this[pq].length - 1) || (n < 1) || (n > this[pq].length - 1)) {
            return false;
        }
        let mItem = this[pq][m];
        let nItem = this[pq][n];
        if (mItem == nItem) {
            return false;
        }
        if (!mItem) {
            return false;
        }
        if (!nItem) {
            return true;
        }
        return mItem > nItem;
    }

    /**
     * Compare implementation via greater
     * @protected
     * @param m
     * @param n
     * @returns {*}
     */
    [comp](m, n) {
        return this[greater](m, n);
    }

    [Symbol.iterator]() {
        return new MinPriorityQueueIterator(this);
    }

    /**
     * Get the min element
     * @public
     * @returns {*}
     */
    min() {
        if (this.empty) {
            throw new Error('Priority queue underflow');
        }
        return this[pq][1];
    }

    /**
     * Delete the min element
     * @returns {*}
     */
    delMin() {
        return this[delTop]();
    }
};
