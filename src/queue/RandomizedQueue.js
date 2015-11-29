/**
 * @module
 * @author Nikita Sushkov
 */
let rq = Symbol();
let qCopy = Symbol();
let sz = Symbol();
let getRand = Symbol();
let resize = Symbol();

/**
 * Iterator for RandomizedQueue
 */
class RandomizedQueueIterator {
    constructor(randomizedQueue) {
        this[qCopy] = new RandomizedQueue();
        this[qCopy][rq] = Array.from(randomizedQueue[rq]);
        this[qCopy][sz] = randomizedQueue[sz];
    }

    next() {
        if (this[qCopy].empty) {
            return {done: true};
        }
        return {value: this[qCopy].dequeue()};
    }

    [Symbol.iterator]() {
        return this;
    }
}

/**
 * Class representing randomized queue
 * @exports RandomizedQueue
 */
export default class RandomizedQueue {
    /**
     *Create a RandomizedQueue
     * @param iterable
     */
    constructor(iterable) {
        this[rq] = [];
        this[sz] = 0;
        if (iterable) {
            if (iterable[Symbol.iterator]) {
                for (let item of iterable) {
                    this.enqueue(item);
                }
            } else {
                throw new TypeError('Priority  queue constructor argument should be iterable');
            }
        }
    }

    /**
     * Get random number from 0 to max
     * @param max
     * @returns {number}
     */
    [getRand](max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Resize inner array
     * @param capacity
     */
    [resize](capacity) {
        let copy = new Array(capacity);
        for (let i = 0; i < this[sz]; i++) {
            copy[i] = this[rq][i];
        }
        this[rq] = copy;
    }

    /**
     * Check if queue is empty
     * @returns {boolean}
     */
    get empty() {
        return this[sz] === 0;
    }

    /**
     * Get the size of the queue
     * @returns {*}
     */
    get size() {
        return this[sz];
    }

    /**
     * Iterable implementation
     */
    [Symbol.iterator]() {
        return new RandomizedQueueIterator(this);
    }

    /**
     * Add element to queue
     * @param item
     */
    enqueue(item) {
        if (!item) {
            throw ReferenceError();
        }
        if (this[sz] === this[rq].length) {
            this[resize](2 * this[rq].length);
        }
        this[rq][this[sz]++] = item;
    }

    /**
     * Remove element from queue
     * @returns {*}
     */
    dequeue() {
        if (this.empty) {
            throw new Error('Can\'t deque: queue is empty');
        }
        let rand = this[getRand](this[sz]);
        let result = this[rq][rand];
        this[sz]--;
        if (rand === this[sz]) {
            this[rq][rand] = undefined;
        }
        else {
            this[rq][rand] = this[rq][this[sz]];
            this[rq][this[sz]] = undefined;
        }
        if (this[sz] < this[rq].length / 4) {
            this[resize](this[rq].length / 2)
        }
        return result;
    }

    /**
     * Get sample element from queue
     * @returns {*}
     */
    sample(){
        if (this.empty) {
            throw new Error('Can\'t return sample: queue is empty');
        }
        let rand = this[getRand](this[rq].length);
        return this[rq][rand];
    }
};