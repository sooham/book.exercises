"use strict";

// Compute the average age difference between mother and child

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

// byName contains names of all people in data set
var have_mothers = ancestry.filter(function(person) {
    return byName[person.mother] !== undefined;
});

var mother_birth_ages = have_mothers.map(function(person) {
    return person.born - byName[person.mother].born;
});

console.log(average(mother_birth_ages));
