/**
 * Created by Nikita on 29.10.2015.
 */
jest.dontMock('../../src/queue/PriorityQueue');
let priorityQueue = require('../../src/queue/PriorityQueue');

describe('MaxPriorityQueue', () => {
    it('can be created', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        expect(pq).not.toBeNull();
    });
    it('is empty after creation', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        expect(pq.empty).toBeTruthy();
    });
    it('supports insert, get and delete max', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        pq.insert(1);
        expect(pq.empty).toBeFalsy();
        let max = pq.max();
        expect(max).toBe(1);
        max = pq.delMax();
        expect(max).toBe(1);
        expect(pq.empty).toBeTruthy();
    });
    it('estimates size correctly', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        pq.insert(1);
        pq.insert(5);
        pq.insert(2);
        pq.insert(3);
        expect(pq.size).toBe(4);
    });
    it('supports priority for delete max', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        pq.insert(1);
        pq.insert(5);
        pq.insert(2);
        pq.insert(3);
        expect(pq.empty).toBeFalsy();
        let max = pq.delMax();
        expect(max).toBe(5);
        expect(pq.empty).toBeFalsy();
        max = pq.delMax();
        expect(max).toBe(3);
        expect(pq.empty).toBeFalsy();
        max = pq.delMax();
        expect(max).toBe(2);
        expect(pq.empty).toBeFalsy();
        max = pq.delMax();
        expect(max).toBe(1);
        expect(pq.empty).toBeTruthy();
    });
    it('supports iterable interface', () => {
        let pq = new priorityQueue.MaxPriorityQueue();
        pq.insert(1);
        pq.insert(4);
        pq.insert(2);
        pq.insert(3);
        let i = 4;
        expect(pq[Symbol.iterator]).toBeDefined();
        let iterator = pq[Symbol.iterator]();
        expect(iterator).not.toBeUndefined();
        for(let item of iterator){
            expect(item).toBe(i);
            i--;
        }
        let max = pq.max();
        expect(max).toBe(4);
    });
    it('accepts iterable as a constructor argument',() => {
        let pq = new priorityQueue.MaxPriorityQueue([1,4,2,3]);
        expect(pq.empty).toBeFalsy();
        let max = pq.max();
        expect(max).toBe(4);
    });
});

describe('MinPriorityQueue', () => {
    it('can be created', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        expect(pq).not.toBeNull();
    });
    it('is empty after creation', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        expect(pq.empty).toBeTruthy();
    });
    it('supports insert, get and delete min', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        pq.insert(1);
        expect(pq.empty).toBeFalsy();
        let min = pq.min();
        expect(min).toBe(1);
        min = pq.delMin();
        expect(min).toBe(1);
        expect(pq.empty).toBeTruthy();
    });
    it('estimates size correctly', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        pq.insert(1);
        pq.insert(5);
        pq.insert(2);
        pq.insert(3);
        expect(pq.size).toBe(4);
    });
    it('supports priority for delete min', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        pq.insert(1);
        pq.insert(5);
        pq.insert(2);
        pq.insert(3);
        expect(pq.empty).toBeFalsy();
        let min = pq.delMin();
        expect(min).toBe(1);
        expect(pq.empty).toBeFalsy();
        min = pq.delMin();
        expect(min).toBe(2);
        expect(pq.empty).toBeFalsy();
        min = pq.delMin();
        expect(min).toBe(3);
        expect(pq.empty).toBeFalsy();
        min = pq.delMin();
        expect(min).toBe(5);
        expect(pq.empty).toBeTruthy();
    });
    it('supports iterable interface', () => {
        let pq = new priorityQueue.MinPriorityQueue();
        pq.insert(1);
        pq.insert(4);
        pq.insert(2);
        pq.insert(3);
        let i = 1;
        expect(pq[Symbol.iterator]).toBeDefined();
        let iterator = pq[Symbol.iterator]();
        expect(iterator).not.toBeUndefined();
        for(let item of iterator){
            expect(item).toBe(i);
            i++;
        }
        let min = pq.min();
        expect(min).toBe(1);
    });
    it('accepts iterable as a constructor argument',() => {
        let pq = new priorityQueue.MinPriorityQueue([1,4,2,3]);
        expect(pq.empty).toBeFalsy();
        let min = pq.min();
        expect(min).toBe(1);
    });
});