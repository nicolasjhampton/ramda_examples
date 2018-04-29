# Functional programming intro

## Part 0: Some basic knowledge 

So, you're a javascript dev, used map once, saw a weird equation for
something called a "y-combinator", or started a conversation about 
programming that ended with someone giving you their recipe for 
"curry". What is up with this "functional programming"???!!!

Well, good luck trying to read anything meaningful about it, because
almost everything assumes that you know everything about functional
programming already. Or, moreso, that you know everything about 
functions, so lets go back to some basics you may already know and take
a deeper look...

### A very simple function

Functional programming demands that you understand every little 
capability of a basic function, so let's make one and take a closer
look...

```js
let identity = x => x;
```

Woah, that's a function? Well, yes, as of es6, this is a perfectly
valid function, and is almost exactly equivelant to this:

```js
let identity = function (x) {
  return x;
}
```

I want to get us used to looking at functions in this first form,
however. The shorter syntax is suggesting that we program in a 
different way. 

1. We don't need parentheses around our arguments if
we only have one argument, which saves us some typing, but also encurages us to make functions that take a single argument. 

2. The normal brackets for the function block can be omitted if our function is a single expression, which again saves us typing, but 
also encourages us to make our functions a single expression

3. If our function body is a single expression without brackets,
then the return value of the function is implied to be the result
of the evaluated expression, and no return keyword is needed. Again,
saves us typing, but also encourages a return value for every function. 

name
arguments
scope
return value