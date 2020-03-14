/*\
title: $:/firstparagraph.js
type: application/javascript
module-type: filteroperator

\*/

(function() {
    exports.firstparagraph = function(source, operand, options) {
        let wiki = options.wiki;
        let results = [];

        source(function(_, title) {
            let parser = wiki.parseTiddler(title);

            if(!parser) {
                return;
            }

            let newTree = [];

            for(let node of parser.tree) {
                if(node.type == 'element' && node.tag == 'p') {
                    newTree.push(node);
                    break;
                }
            }

            parser.tree = newTree;


            let widgetNode = wiki.makeWidget(parser, {});
            let container = $tw.fakeDocument.createElement('div');
            widgetNode.render(container, null);

            if(operand.suffix == 'text') {
                results.push(container.textContent);
            } else {
                results.push(container.innerHTML);
            }
        });

        return results;
    };
})();
