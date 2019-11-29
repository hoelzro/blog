/*\
title: $:/sameyear.js
type: application/javascript
module-type: filteroperator

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.sameyear = function(source,operator,options) {
    let targetYear = operator.operand;
    let fieldName  = operator.suffix || 'modified';
    let results    = [];

    source(function(tiddler, title) {
        if(tiddler) {
            let date = $tw.utils.parseDate(tiddler.fields[fieldName]);
            let year = $tw.utils.formatDateString(date, 'YYYY');

            if(year == targetYear) {
                results.push(title);
            }
        }
    });

    return results;
};

})();
