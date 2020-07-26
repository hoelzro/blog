(function() {
  exports.name = 'emoji';
  exports.types = {inline: true};

  const EMOJI_LOOKUP = {
    '+1': '👍',
    '-1': '👎',
    'confused-parrot': '{{$:/custom/images/confused_parrot}}',
    'crossed-fingers': '🤞',
    'disappointed': '😞',
    'facepalm': '🤦‍♂️',
    'flip-table': '',
    'grimace': '😬',
    'grimacing': '😬',
    'joy': '😂',
    'laugh': '🤣',
    'laughing': '🤣',
    'point-up': '☝️',
    'puke': '🤢',
    'scream': '😱',
    'sob': '😭',
    'tired': '😫',
    'tired-face': '😫',
    'worried': '😟',

    null: null // for trailing comma
  };

  exports.init = function(parser) {
    this.parser = parser;
    this.matchRegExp = /(?<=\s):([-_+a-z0-9]+):/mg;
  };

  exports.parse = function() {
    this.parser.pos = this.matchRegExp.lastIndex;
    let emojiName = this.match[1].replaceAll(/([a-z])_([a-z])/g, '$1-$2');

    if(EMOJI_LOOKUP.hasOwnProperty(emojiName)) {
      let emojiValue = EMOJI_LOOKUP[emojiName];
      if(emojiValue.startsWith('{{') && emojiValue.endsWith('}}')) {
        let emojiTiddler = emojiValue.slice(2, -2);
        return [{
          "type": "image",
          "attributes": {
              "source": {
                  "name": "source",
                  "type": "string",
                  "value": emojiTiddler
              },
              "height": {
                  "name": "height",
                  "type": "string",
                  "value": "28"
              }
          },
          "tag": "$image",
          "isSelfClosing": true,
          "isBlock": false
        }];
      }

      return [{
        type: 'text',
        text: emojiValue
      }];
    } else {
      return [{
        type: 'text',
        text: this.match[0]
      }];
    }
  };
})();
