function month() {
  /* The month module / namespace
   * contains functions for converting months into a
   * number based system
   */
  var months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

  name = function (int) {return months[int];};
  number = function(monthName) {return months.indexOf(monthName);};
}


console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10
