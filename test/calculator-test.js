//var expect = require('chai').expect;

var expect = chai.expect;

describe('Calculator', function () {
    // Mocha's before() function runs once before the rest of the tests start
    // Mocha also comes with after, beforeEach and afterEach
    before(function () {
        // Create a new instance of our Calculator module to be used in
        // each `it` test case within the 'Calculator' describe block
        this.calculator = new Calculator();
    });

    describe('Adding', function () {
        it('should throw an error if a non-numeric value is used', function () {
            // Chai's expect function will take any value, including a function
            // but in our case, we want it to throw an error. If we just said
            // this.calculator.add(2, 'a'), the error would throw before `expect`
            // could handle it. This is why we create a new function using bind
            // passing in our specified arguments and let Chai catch the error.
            expect(this.calculator.add.bind(this.calculator, 2, 'a')).to.throw();
        });

        it('should throw an error if less than 2 values are provided', function () {
            expect(this.calculator.add.bind(this.calculator, 2)).to.throw();
        });

        it('should add a series of number arguments together', function () {
            // This test case reads exactly how you would expect
            expect(this.calculator.add(2, 5)).to.equal(7); // passes
        });

        // All functions like add, subtract etc, should filter the non-numbers
        // before operating on them. We can check to see that the filter was called
        // using a spy
        it('should filter the input', function () {
            // Create spy on the filter function to make sure it was called.
            // We could create a stub here as well and it will be called,
            // but using a stub means the actual filter function doesn't get
            // called upon which would make add() fail.
            var filterSpy = sinon.spy(this.calculator, '_filter');
            this.calculator.add(2, 5);
            // Chai + Sinon here.
            expect(filterSpy).to.have.been.called;
            // When creating a spy or stub to wrap a function, you'll want
            // to make sure you restore the original function back at the
            // end of your test case
            filterSpy.restore();
        });
    });
});