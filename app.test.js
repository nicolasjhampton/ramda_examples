"use strict";

const { 
    createQueryString,
    formatKeyValue,
    createRequest
 } = require('./app');


describe("The createQueryString function", () => {
    const result = createQueryString({
        q: "New York Times", 
        page: "2", 
        sort: "oldest"
    });

    it("should produce a string", () => {
        expect(typeof result).toBe("string");
    });

    it("should contain the correctly formatted key/values", () => {
        console.log(result);
        expect(result).toMatch("q=new+york+times&page=2&sort=oldest");
    });
});

describe("The formatKeyValue function", () => {
    const result = formatKeyValue(["query", "New York Times"])

    it("should produce an array", () => {
        expect(result).toEqual(expect.any(Array));
    });

    it("should produce an array of length 2", () => {
        expect(result.length).toEqual(2);
    });

    it("should produce an array of two string values", () => {
        console.log(result)
        expect(result[0]).toEqual(expect.any(String));
        expect(result[1]).toEqual(expect.any(String));
    });

    it("returns the key as the first array value, unchanged", () => {
        expect(result[0]).toEqual("query");
    });

    it("returns the value as a lower case string joined by '+'", () => {
        expect(result[1]).toEqual("new+york+times");
    });

});


describe("The createRequest function", () => {
    const result = createRequest({
        q: "New York Times", 
        page: "2", 
        sort: "oldest"
    });

    it("should produce the correct string", () => {
        expect(result).toBe(
            ".json?q=new+york+times&page=2&sort=oldest&api-key=38b466115dc4458db9c8ee5582a6e4b2"
        );
    });
});