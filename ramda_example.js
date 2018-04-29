"use strict";

const R = require('ramda');
const fetch = require('node-fetch');

const articleSearchEndpoint = "http://api.nytimes.com/svc/search/v2/articlesearch";

const ramda = "http://ramdajs.com/docs/";

/**
 * Problem:
 * I need to make a request to The New York Times API.
 * Their Article Search endpoint accepts a GET request
 * to a json endpoint with query parameters and an 
 * API key. 
 * 
 * I'd like to provide an easy way to interact
 * and modify this query string by using a function
 * that takes a object of all my query parameters,
 * and appends the needed query string to the end of
 * the api endpoint. It should look something like 
 * this in the end...
 */

const queryWanted = ".json?q=new+york+times&page=2&sort=oldest&api-key=38b466115dc4458db9c8ee5582a6e4b2";
const args = {
    q: "New York Times", 
    page: "2", 
    sort: "oldest"
};

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

let createQuery = require('./create_query');

// const stringCreated = createQuery(args);

// console.log(stringCreated === queryWanted);

// fetch(articleSearchEndpoint + stringCreated)
//     .then(res => res.json())
//     .then(console.log)

/**
 * Creating this `createQuery` function is going to
 * be our goal, but what I hope to demonstrate is how
 * much more we get by approaching this problem with 
 * functional programming, and how the Ramda Library 
 * really facilitates this process more than other
 * similar libraries, such as lodash or underscore
 */

 /**
 * One of the hardest parts of this process is getting
 * started. Concatenating this string would be so easy, 
 * and it's hard to see the benefit of using another 
 * approach here.
 * 
 * With Ramda, I find it's good to start by imagining one
 * magic function that solves your problem. What does 
 * that function take as an argument? What does it return? 
 * 
 * This imaginary function will be our start, and we'll 
 * mock it out using R.compose, R.always, and console.log
 */

const returnQuery = R.always(queryWanted); 
const logArg = x => { console.log(x); return x; }

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

createQuery = R.compose(
    returnQuery,
    logArg
);

// function createQuery(x) {
//     return function() {
//         func(x, y);
//     }
// }

let stringCreated = createQuery(args);

// console.log(stringCreated);

// console.log(stringCreated === queryWanted);


/**
 * R.always is returning a function that always returns
 * the same value. Lots of Ramda functions just return
 * single argument functions to spread their execution
 * over multiple function calls. This is called currying,
 * and it's the backbone of Ramda.
 * 
 * R.compose is similar. It takes one or more functions
 * as arguments on its first execution, and returns a function
 * that takes arguments. Running the returned function will
 * run the first function passed to compose and pass the 
 * return value to the second function, which passes it's 
 * return value to the third, and so on, as though each
 * function was nested in the argument of the next.
 * 
 * The function returned to createQuery really looks like this:
 */


// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// stringCreated = returnQuery(logArg(args));

// console.log(stringCreated);

// console.log(stringCreated === queryWanted);

/**
 * Notice compose looks a little backwards when you 
 * read it, but it also looks a little "inside out and 
 * backwards" when you nest functions in the same way.
 * 
 * For this reason, I like to give my arguments to R.compose 
 * vertically, so I can think of the data "rising" through 
 * the functions, which is a bit easier to think about...
 */

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// stringCreated = R.compose(
//     returnQuery, // let myQuery = returnQuery(returnVal) <- then passed here
//     logArg // let returnVal = logArg(args) <- passed here
// )(args); // <- data started here

// console.log(stringCreated);

// console.log(stringCreated === queryWanted);


/**
 * Now I have a function that takes the object I want
 * to give it, and returns a string. Our two functions
 * are just helpers to see where we're going, but
 * they can be really helpful when you just need to mock 
 * a return value you haven't figured out yet, or see what 
 * a function is getting as an argument in the middle of 
 * an R.compose call.
 * 
 * Let's look a little closer at the query we want
 * to make some decisions about what functions we'll need
 * inside createQuery...
 */

const jsonQuery = ".json?";
const queryPairs = "q=new+york+times&page=2&sort=oldest";
const key = "&api-key=38b466115dc4458db9c8ee5582a6e4b2";

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------
// console.log(jsonQuery + queryPairs + key);
// console.log(queryWanted);
// console.log((jsonQuery + queryPairs + key) === queryWanted);

/**
 * Looking at this, the string seems to split pretty evenly
 * into three problems: a json query prefix, a set of query
 * pairs we provide as an argument, and an api query pair that
 * is assumed. 
 * 
 * So that's exactly how I'm going to organize my functions 
 * in createQuery, a function for each problem.
 */

// placeholders for what we'll do
let addApiKey = R.identity; // x => x
let addQueryPairs = R.identity;
let addJsonPrefix = R.identity;
// the input of a function can only operate on the output of the last function
createQuery = R.compose(
    returnQuery, // <- this is just a target

    logArg, // <- this is just a logger

    addApiKey, // <- These are the functions we care about
    addQueryPairs, // <- These are the functions we care about
    addJsonPrefix, // <- These are the functions we care about

    logArg // <- this is just a logger
);

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// console.log(createQuery({
//     q: "New York Times", 
//     page: "2", 
//     sort: "oldest"
// }) === queryWanted);

/**
 * This looks great, but we still aren't thinking 
 * about this right. Notice that the argument we
 * start with isn't really the data we start to 
 * work with first.
 * 
 * We only pass one argument down our R.compose()
 * chain, so if we don't start with our argument,
 * we have no way to remember our argument later.
 * Any information we collect along the way has
 * to be collected, or "accumulated", in one argument,
 * until R.compose finishes.
 * 
 * It's going to be far easier to 
 * work with the query pairs first, because we can't
 * remember what they were in a later function if
 * we don't.
 * 
 * Because of this, I'm going to change the order 
 * of my functions
 */

createQuery = R.compose(
    returnQuery,
    logArg,

    addJsonPrefix, // <- add least similar data
    addApiKey, // <- add info in similar format
    addQueryPairs, // <- start with what we know

    logArg
);

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// console.log(createQuery({
//     q: "New York Times", 
//     page: "2", 
//     sort: "oldest"
// }) === queryWanted);

/**
 * My first function, addQueryPairs, is the 
 * only function I'll write that can potentially 
 * take more than one argument, though in this
 * case I'll only deal with the query object.
 * 
 * I've got a lot of keys and values in this object,
 * and I'm doing the same thing to each pair. That's 
 * iteration, so I could really use map right now. 
 * Unfortunately, I still only have an object.
 * 
 * Fortunately, ramda has R.toPairs()
 */

addQueryPairs = R.compose(
    logArg,
    R.toPairs()
);

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// addQueryPairs(args);

/**
 * Wait, Another compose???!!!
 * Why not? 
 * 
 * It's just another, smaller problem I need a solution
 * to. Takes arguments, returns a value. In functional
 * programming, the problems often get smaller, but the 
 * solution stays the same.
 * 
 * toPairs will give us a two-dimensional array of
 * key/value pairs from the object. Now we can start 
 * using R.map to access each pair indiviually with 
 * a function
 */

addQueryPairs = R.compose(
    logArg,
    R.map(R.identity), // <-- R.identity is smaller problem
    R.toPairs()
)

//R.map = (x) => [r.identity(x[0]), ...]

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// addQueryPairs(args);

/**
 * R.identity is really useful to use while you figure
 * things out.
 * 
 * Note: This isn't javascript's version of map. There's
 * no index argument, no array argument to the callback.
 * The function map returns takes one argument, the callback
 * map asks for takes one argument, the function toPairs
 * returns takes one argument: the return value of the
 * last function. 
 * 
 * This is the main strength Ramda has:
 * that last argument most of these functions take is 
 * the data you're transforming, which makes them all
 * work together extremely well.
 */

let joinQueryPair = R.pipe(R.identity, R.join("="))

joinQueryPair = R.compose(R.join("="), R.identity)

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

addQueryPairs = R.compose(
    logArg,
    R.map(joinQueryPair),
    R.toPairs()
);

addQueryPairs(args);

 /**
  * I found join on the ramda website:
  * http://ramdajs.com/docs/#join
  * Ramda's website is built to search by argument 
  * type. I searched for "list" (array) to find 
  * join, because I needed something to join the 
  * array pairs with equals.
  * 
  * Pipe is just compose, except in reverse. I 
  * like to use it when I'm writing small bits
  * of inline code left to right. 
  * 
  * Again, using identity as a placeholder here
  * for yet a smaller problem.
  */
// [ key/value, pair ]
// [ "key/value=pair" ]
let formatPair = pair => R.concat(R.init(pair))(R.tail(pair));

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

// joinQueryPair = R.pipe(logArg, formatPair, R.join("="));

// addQueryPairs = R.compose(
//     logArg,
//     R.map(joinQueryPair),
//     R.toPairs()
// );
// addQueryPairs(args);

/**
 * Ok, this gets tricky, and I would be lying if I
 * said this formatPair function didn't take a minute.
 * Again, logArg is really useful here. With it, we 
 * can see the array pairs coming in, and the join 
 * coming out. 
 * 
 * Again, we have two different problems: formatting
 * the key and formatting the value. Two problems, 
 * two functions. The trick was finding the right 
 * function combination. Again, search in Ramda for 
 * the data type you're getting, and the data type
 * you need to return. Types are really important with Ramda.
 * 
 * I needed the first and the last array item. R.head and 
 * R.last are good for this, but they return single values 
 * instead of arrays that R.concat can work with, so I 
 * decided to use R.init and R.tail, which return arrays 
 * that R.concat plays with easily.
 */

let formatKey = R.init;

let formatValue = R.compose(
    R.of, // x => [x]
    R.toLower,
    R.replace(/\s/g, "+"),
    R.last
)

formatPair = pair => R.concat(formatKey(pair))(formatValue(pair))

joinQueryPair = R.pipe(formatPair, R.join("="))

// --------------------------------------------
// uncomment, run, then comment
// --------------------------------------------

addQueryPairs = R.compose(
    logArg,
    R.map(joinQueryPair),
    R.toPairs()
);

addQueryPairs(args);

/**
 * formatPair allows us to solve two smaller problems,
 * formatting the key and formatting the value.
 * Now we can format the value on it's own. 
 * 
 * And we've gotten down to the bottom of our
 * formatting problem. No more russian dolls.
 * 
 * Seems like a lot of work for nothing, but as
 * build back up, we might see some benefits.
 */

// pretend this is properly .gitignored in another file 
const apiKey = {"api-key": "38b466115dc4458db9c8ee5582a6e4b2"};

addQueryPairs = R.compose(
    R.map(joinQueryPair),
    R.toPairs()
);

addApiKey = R.pipe(addQueryPairs, ([x]) => x, R.append)

// console.log(addApiKey(apiKey)(["rest of query string"]));

/**
 * Hey! I just formatted the api-key pair with 
 * the same function I was using for the key/value
 * list. Stumbling across these combinations 
 * is a neverending story in functional programming,
 * and Ramda is designed to make that discovery
 * as smooth as it can be
 */

// const apiKey = {"api-key": "38b466115dc4458db9c8ee5582a6e4b2"};

// const formatKey = R.init;

// const formatValue = R.compose(
//     R.of,
//     R.toLower,
//     R.replace(/\s/g, "+"),
//     R.last
// )

// const formatPair = pair => R.concat(formatKey(pair))(formatValue(pair))

// const joinQueryPair = R.pipe(formatPair, R.join("="))

// const addQueryPairs = R.compose(
//     R.map(joinQueryPair),
//     R.toPairs()
// );

const addJsonPrefix = R.concat(".json?")
const addApiKey = R.append(...addQueryPairs(apiKey))

const createQuery = R.compose(
    // returnQuery,
    logArg,
    addJsonPrefix,
    R.join("&"),
    addApiKey,
    addQueryPairs,
    logArg
);

createQuery(args);
