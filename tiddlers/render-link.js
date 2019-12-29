/*\
title: $:/render-link.js
type: application/javascript
module-type: macro

\*/

(function() {
    exports.name = 'tv-get-export-link';
    exports.params = [{ name: 'to' }];
    exports.run = function(to, isRelative) {
        let tiddler = $tw.wiki.getTiddler(to);

        if(tiddler && tiddler.getFieldString('relative_url') != '') {
            if(isRelative) {
                return tiddler.getFieldString('relative_url');
            } else {
                return '/' + tiddler.getFieldString('relative_url');
            }
        }

        let prefix = '';
        // XXX remove this `tiddler &&` check
        if(tiddler && tiddler.hasTag('Blog Post')) {
            prefix = 'blog/';
        }
        if(tiddler && tiddler.hasTag('Reference')) {
            prefix = 'ref/';
        }

        if(!isRelative) {
            prefix = '/' + prefix;
        }

        return prefix + to.toLowerCase().replace(/'/g, '').replace(/\W+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
    };
})();
