/*\
title: $:/isaudio.js
type: application/javascript
module-type: isfilteroperator

\*/

(function() {
    exports.audio = function(source, prefix, options) {
        let results = [];

        if(prefix == '!') {
            source(function(tiddler, title) {
                let contentType = tiddler.getFieldString('type');
                if(!contentType.startsWith('audio/')) {
                    results.push(title);
                }
            });
        } else {
            source(function(tiddler, title) {
                let contentType = tiddler.getFieldString('type');
                if(contentType.startsWith('audio/')) {
                    results.push(title);
                }
            });
        }

        return results;
    };
})();

