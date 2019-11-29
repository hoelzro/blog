/*\
title: $:/eachdate.js
type: application/javascript
module-type: filteroperator

\*/
(function(){

exports.eachdate = function(source,operator,options) {
    let format    = operator.operand;
    let fieldName = operator.suffix || 'modified';
    let results   = [];
    let seen      = Object.create(null);

    source(function(tiddler, title) {
        if(tiddler && tiddler.fields[fieldName]) {
            let date = $tw.utils.parseDate(tiddler.fields[fieldName]);
            let value = $tw.utils.formatDateString(date, format);
            if(!seen[value]) {
                seen[value] = true;
                results.push(value);
            }
        }
    });

    return results;
};

})();
