/*\
title: $:/upto.js
type: application/javascript
module-type: filteroperator

\*/

(function() {
    exports.upto = function(source, operand, options) {
        let end;
        
        source(function(_, value) {
            end = value;
        });

        let result = [];
        for(let i = 1; i <= end; i++) {
            result.push(i.toString());
        }
        return result;
    };
})();
