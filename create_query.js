"use strict";

const R = require('ramda');

const apiKey = {"api-key": "38b466115dc4458db9c8ee5582a6e4b2"};

const formatKey = R.init;
const formatValue = R.compose(
    R.of,
    R.toLower,
    R.replace(/\s/g, "+"),
    R.last
)

const formatPair = pair => R.concat(formatKey(pair))(formatValue(pair))

const joinQueryPair = R.pipe(formatPair, R.join("="))

const addQueryPairs = R.compose(
    R.map(joinQueryPair),
    R.toPairs()
);


const addApiSuffix = R.append(...addQueryPairs(apiKey))

const addJsonPrefix = R.concat(".json?")

const createQuery = R.compose(
    addJsonPrefix,
    R.join("&"),
    addApiSuffix,
    addQueryPairs
);

module.exports = createQuery;