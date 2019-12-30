/*\
title: $:/isvideo.js
type: application/javascript
module-type: isfilteroperator

\*/

(function() {
    exports.video = function(source, prefix, options) {
        let results = [];

        if(prefix == '!') {
            source(function(tiddler, title) {
                let contentType = tiddler.getFieldString('type');
                if(!contentType.startsWith('video/')) {
                    results.push(title);
                }
            });
        } else {
            source(function(tiddler, title) {
                let contentType = tiddler.getFieldString('type');
                if(contentType.startsWith('video/')) {
                    results.push(title);
                }
            });
        }

        return results;
    };
})();

