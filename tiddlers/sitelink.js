/*\
title: $:/sitelink.js
type: application/javascript
module-type: filteroperator

\*/

(function() {
    exports.sitelink = function(source, operand, options) {
        let result = [];
        source(function(tiddler, title) {
            let prefix = '';
            if(tiddler.hasTag('Blog Post')) {
                prefix = 'blog/';
            }
            result.push(prefix + title.toLowerCase().replace(/\W+/g, '-').replace(/-+$/, ''));
        });
        return result;
    };
})();
