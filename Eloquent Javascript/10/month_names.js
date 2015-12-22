"use strict";
var month = function(){
    /* The month module / namespace
     * contains functions for converting months into a
     * number based system
     */
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];

  return {
    name: function (int) {return months[int];},
    number: function(monthName) {return months.indexOf(monthName);}
    };
}();
