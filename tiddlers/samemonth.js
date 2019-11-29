/*\
title: $:/samemonth.js
type: application/javascript
module-type: filteroperator

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.samemonth = function(source,operator,options) {
    let targetMonth = operator.operand;
    let fieldName   = operator.suffix || 'modified';
    let results     = [];

    source(function(tiddler, title) {
        if(tiddler) {
            let date = $tw.utils.parseDate(tiddler.fields[fieldName]);
            let month = $tw.utils.formatDateString(date, 'MMM');

            if(month == targetMonth) {
                results.push(title);
            }
        }
    });

    return results;
};

})();
