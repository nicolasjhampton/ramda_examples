const R = require('ramda');

/**
 * Before we can talk about Ramda, what it is, how we can use it, and
 * why, we HAVE to talk about functions in the most basic sense
 */


describe("Identity: ", () => {

    describe("Our identity function", () => {

        /**
         * The most basic way to think of a function is as a process.
         * That process receives input as arguments and returns output
         * as a return value. Inbetween input and output, the function
         * performs a process of some sort. Our identity function, in 
         * a way, represents the simpliest form of a function, that 
         * takes one argument as input and returns that same input as
         * output, doing nothing inbetween.
         */
        
        const identity = function (x) {
            return x;
        }

        it("returns the argument it's given, without change", () => {
            expect(identity(1)).toBe(1);
        });
    });

    describe("The R.identity function", () => {

        it("returns the argument it's given, without change", () => {
            expect(R.identity(1)).toBe(1);
        });

    });

});


describe("Side effects: ", () => {

    describe("A function that effects something outside of itself", () => {

        /**
         * But fundamentally, there's two important types of functions:
         * Functions that affect things outside of themselves are called
         * impure functions, and functions that affect nothing outside of 
         * themselves are called pure functions. This impure function below
         * affects the variable y outside of itself when ran.
         */
        let y = 0;
        const impureFunc = function (x) {
            y++;
            return x;
        }

        it("is hard to reason about and can cause unexpected behavior", () => {
            expect(impureFunc(0)).toBe(0);
            expect(y).toBe(0);
        });
    });

    describe("It can be hard to tell if a function is pure or impure", () => {

        /**
         * For example, this logArg function appears to be pure,
         * but running it will have a direct effect on the value
         * of stdout, which console.log uses to write to the 
         * screen. We can see this by hooking into stdout using it's
         * write method to add 1 to y. But if there were no side
         * effects to a program, nothing meaningful would happen.
         * The goal is to avoid side effects within reason, so
         * we can easily reason about what is happening in the 
         * program.
         */

        let y = 0;
        const logArg = function (x) {
            console.log(x);
            return x;
        }

        // We'll spy on stdout, which console.log uses to write to the screen
        process.stdout.write = (function(write) {
            return (...args) => { write(...args); ++y;}
        })(process.stdout.write.bind(process.stdout));

        it("and some side effects we want, like writing to the screen", () => {
            expect(logArg(1)).toBe(1);
            expect(y).toBe(0);
        });
    });

});

describe("Transforming data: ", () => {

    describe("Changing your input directly", () => {

        /**
         * For the same reasons that we avoid side effects,
         * we also avoid changing the input of our functions,
         * the arguments, directly. Changing the argument 
         * directly can have an unintended effect on the
         * data it was based on. 
         */
        let x = [0];
        const mutateX = function (x) {
            x[0]++;
            return x;
        }

        it("can cause unintended side effects", () => {
            expect(mutateX(x)).toEqual([1]);
            expect(x).toEqual([0]);
        });
    });

    describe("To avoid side effects, only change copies of your input", () => {

        /**
         * For example, this logArg function appears to be pure,
         * but running it will have a direct effect on the value
         * of stdout, which console.log uses to write to the 
         * screen. We can see this by hooking into stdout using it's
         * write method to add 1 to y. But if there were no side
         * effects to a program, nothing meaningful would happen.
         * The goal is to avoid side effects within reason, so
         * we can easily reason about what is happening in the 
         * program.
         */

        let y = 0;
        const logArg = function (x) {
            console.log(x);
            return x;
        }

        // We'll spy on stdout, which console.log uses to write to the screen
        process.stdout.write = (function(write) {
            return (...args) => { write(...args); ++y;}
        })(process.stdout.write.bind(process.stdout));

        xit("and some side effects we want, like writing to the screen", () => {
            expect(logArg(1)).toBe(1);
            expect(y).toBe(0);
        });
    });

});









function always(x) {
    return function(y) {
        return x
    }
}

