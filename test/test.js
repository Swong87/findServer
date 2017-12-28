// We require "Chai"
// This extends each object with a "Should" property to start your chain.
// WARNING: REALLY TECHIE STUFF HERE --> "should" works by extending the Object.prototype.  Does not work if you use it to check existence of an object.
// DO NOT USE IE.  .should() has compatibility issues with it.
const should = require("chai").should(); // <- Actually calls the function.
// Grab the request package
const request = require("request");

const findServers = require("../codeTest").findServers;

// Describe is used to group individual tests
// The first parameter indicates what we're testing.
describe("checkServers", function() {
  // "It" is used to craete the actual tests.
  // It's first parameter is a human readable test description.
  // Code to be tested is passed within the second parameter, the anonumous function.
  // Each "it" is one specific test!
  it("should find no online servers", function() {
    findServers();
    resultsArray.should.have.lengthOf(0);
  });

  it("should find 3 online servers", function() {
    findServers();
    resultsArray.should.have.lengthOf(0);
  });

  it("should throw error when array doesn't have urls", function() {
    findServers();
    resultsArray.should.have.lengthOf(0);
  });
});

/* 
Other examples of the "Should":
    should.exist
    should.not.exist
    should.equal
    should.not.equal
    should.Throw
    should.not.Throw
*/
