/**
 * Created by n0212893 on 6/27/2016.
 */
var sayHello = require('./../src/sayHello.js');
var name = "World";

describe('Greet', function() {
    it('concats Hello and a name', function () {
        var actual = sayHello.greet(name);
        var expected = 'Hello, World';
        expect(actual).toEqual(expected);
    });
});

describe('Noname', function () {
    it('checks for a valid/non-blank name', function () {
        expect(name).toBeDefined();
    });
});