jest.dontMock('../../src/queue/RandomizedQueue');
let RandomizedQueue = require('../../src/queue/RandomizedQueue');

describe('RandomizedQueue', () =>{
    it('can be created', () => {
        let rq = new RandomizedQueue();
        expect(rq).not.toBeNull();
    });
    it('is empty after creation', () => {
        let rq = new RandomizedQueue();
        expect(rq.empty).toBeTruthy();
    });
    it('supports enqueue, dequeue and sample', () => {
        let rq = new RandomizedQueue();
        rq.enqueue(1);
        rq.enqueue(2);
        expect(rq.empty).toBeFalsy();
        let valArr = [1, 2];
        let sample = rq.sample();
        expect(valArr.indexOf(sample)).toBeGreaterThan(-1);
        let first = rq.dequeue();
        expect(valArr.indexOf(first)).toBeGreaterThan(-1);
        let second = rq.dequeue();
        expect(valArr.indexOf(second)).toBeGreaterThan(-1);
        expect(rq.empty).toBeTruthy();
    });
    it('supports iterable interface', () => {
        let rq = new RandomizedQueue();
        rq.enqueue(1);
        rq.enqueue(2);
        rq.enqueue(3);
        rq.enqueue(4);
        expect(rq[Symbol.iterator]).toBeDefined();
        let iterator = rq[Symbol.iterator]();
        expect(iterator).not.toBeUndefined();
        let valArr = [1, 2, 3, 4];
        for(let item of iterator){
            expect(valArr.indexOf(item)).toBeGreaterThan(-1);
        }
        let sample = rq.sample();
        expect(valArr.indexOf(sample)).toBeGreaterThan(-1);
    });
    it('accepts iterable as a constructor argument',() => {
        let rq = new RandomizedQueue([1,4,2,3]);
        expect(rq.empty).toBeFalsy();
    });
});
