"use strict";

const R = require('ramda');
const fetch = require('node-fetch');

const nytSearchAPI = 'http://api.nytimes.com/svc/search/v2/articlesearch';

const query = 'json?q=new+york+times&page=2&sort=oldest&api-key=38b466115dc4458db9c8ee5582a6e4b2';

/**
 * Test 1
 * Get a string from an object
 */
// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.toPairs() // split the object into key/value array pairs
// )

/**
 * I can go from an object to a string. Inbetween, I 
 * have an array of key/value arrays. I need to do
 * something TO EACH of those pairs, so I need a map
 * as an intermeidary step. For right now, I'll insert
 * that map, using R.identity, which is just x => x,
 * a placeholder function. Our string test still passes
 */
// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(R.identity()), // we have to map here, we just don't know how yet
//     R.toPairs() // split the object into key/value array pairs
// )



/**
 * Now that we have each key/value pair isolated, our
 * map function needs to isolate each key from it's value.
 * The head and last functions in ramda work perfectly 
 * for this. Be careful to use head and last, not init and tail,
 * which work like the rest operator and return arrays, not 
 * single values. We'll use head and last to get closer to 
 * the level we want to transform our data at
 */
// const keyValuePair = (pair) => [R.head(pair), R.last(pair)]

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )



/**
 * I'm going to make a very important change here. Instead of 
 * using brackets to return our array in keyValuePair, I'm going 
 * to use R.prepend to join the head and tail of the array (a single 
 * value and an array of one value) into the same array we received
 * before. This is really like algorithm analysis, breaking a large
 * problem into a series of smaller ones
 */
// 

// const keyValuePair = pair => R.prepend(R.head(pair), R.tail(pair))

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )

/**
 * The automatic curry of Ramda allows us to separate this into 
 * two sepearate function calls
 */
// const keyValuePair = pair => R.prepend(R.head(pair))(R.tail(pair))

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )




// const keyValuePair = pair => R.prepend(R.last(pair))(R.init(pair))

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )


// const makeList = (...x) => x

// const plusJoined = R.replace(/\s/g, "+")

// const keyValuePair = pair => R.prepend(R.head(pair))(makeList(plusJoined(R.last(pair))))

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )






/**
 * Now that we've identified the level our transformations 
 * will take place, we can isolate the composed function 
 * for easy, modular expansion later (I added the lowercase 
 * here without a thought). Because the valueTransform
 * function is an implementation detail of the keyValuePair 
 * function made of other small, simple, tested functions, I 
 * won't bother testing it, only add tests to our keyValuePair
 * function
 */
// const valueTransform = R.compose(
//     (...x) => x,
//     R.toLower,
//     R.replace(/\s/g, "+"),
//     R.last
// );

// const keyValuePair = pair => R.prepend(R.head(pair))(valueTransform(pair))

// const createQueryString = R.compose(
//     R.join(""), // join the arrays into a string
//     R.map(keyValuePair), // insert map function here
//     R.toPairs() //  split the object into key/value array pairs
// )




// const valueTransform = R.compose(
//     (...x) => x,
//     R.toLower,
//     R.replace(/\s/g, "+"),
//     R.last
// );

// const formatKeyValue = pair => R.prepend(R.head(pair))(valueTransform(pair))

// const createQueryString = R.compose(
//     R.join("&"), // We'll add a join character here
//     R.map(
//         R.pipe(formatKeyValue, R.join("=")) // and here
//     ), 
//     R.toPairs() // split the object into key/value array pairs
// )


// const valueTransform = R.compose(
//     (...x) => x,
//     R.toLower,
//     R.replace(/\s/g, "+"),
//     R.last
// );

// const keyTransform = R.compose(
//     R.head
// )

// const formatKeyValue = pair => R.prepend(keyTransform(pair))(valueTransform(pair))

// const apiKey = () => ["api-key", "38b466115dc4458db9c8ee5582a6e4b2"]

// const createQueryString = R.compose(
//     R.join("&"), // We'll add a join character here
//     R.map(
//         R.pipe(formatKeyValue, R.join("=")) // and here
//     ), 
//     R.append(apiKey()), // we can add this api key easily with composition
//     R.toPairs() 
// )





// const addPrefix = prefix => R.curry((a, b) => a + b)(prefix)

// const addSuffix = suffix => R.curry((a, b) => b + a)(suffix)

// const valueTransform = R.compose(
//     (...x) => x,
//     R.toLower,
//     R.replace(/\s/g, "+"),
//     R.last
// );

// const keyTransform = R.compose(
//     R.head
// )

// const formatKeyValue = pair => R.prepend(keyTransform(pair))(valueTransform(pair))

// const createKeyValue = R.pipe(formatKeyValue, R.join("="))

// const apiKey = ["api-key", "38b466115dc4458db9c8ee5582a6e4b2"]

// const formatApiKey = apiKey => addPrefix("&")(createKeyValue(apiKey))

// const createQueryString = R.compose(
//     addPrefix(".json?"),
//     addSuffix(formatApiKey(apiKey)),
//     R.join("&"), // We'll add a join character here
//     R.map(createKeyValue), 
//     R.toPairs() 
// )



const apiKey = ["api-key", "38b466115dc4458db9c8ee5582a6e4b2"]

const valueTransform = R.compose(
    (...x) => x,
    R.toLower,
    R.replace(/\s/g, "+"),
    R.last
);

const keyTransform = R.compose(
    R.head
)

const formatKeyValue = pair => R.prepend(keyTransform(pair))(valueTransform(pair))

const createKeyValue = R.pipe(formatKeyValue, R.join("="))

const createQueryString = R.compose(
    R.join("&"), // We'll add a join character here
    R.map(createKeyValue), 
    R.toPairs() 
)

const addPrefix = prefix => R.curry((a, b) => a + b)(prefix)

const addSuffix = suffix => R.curry((a, b) => b + a)(suffix)

const addApiKey = R.compose(
    addSuffix,
    addPrefix("&"),
    createKeyValue
)

const createRequest = R.compose(
    addPrefix(".json?"),
    addApiKey(apiKey), 
    createQueryString
)


module.exports = { 
    createRequest,
    createQueryString,
    formatKeyValue
 };




// fetch('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=38b466115dc4458db9c8ee5582a6e4b2')
//     .then(res => res.json())
//     .then(console.log)

