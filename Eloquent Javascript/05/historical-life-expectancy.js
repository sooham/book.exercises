"use strict";

// Compute and output the average age of people per century
// Century is assigned by Math.ceil(person.died / 100)

function average(array) {
    function plus(a, b) { return a + b;}
    return array.reduce(plus) / array.length;
}

var ages_and_century = {};
ancestry.forEach(function (person) {
    var cent = Math.ceil(person.died / 100);
    var age = person.died - person.born;
    if (ages_and_century[cent] === undefined) {
        ages_and_century[cent] = [age];
    } else {
        ages_and_century[cent].push(age);
    }
});

for (var century in ages_and_century) {
    ages_and_century[century] = average(ages_and_century[century]);
    console.log("" + century + ": " + ages_and_century[century]);
}


