/*\
title: $:/sitelink.js
type: application/javascript
module-type: filteroperator

\*/

(function() {
    let renderLink = require('$:/render-link.js').run;

    exports.sitelink = function(source, operand, options) {
        let result = [];
        source(function(tiddler, title) {
            result.push(renderLink(title));
        });
        return result;
    };
})();
