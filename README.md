The HTML beautifier does the following things:
- Correct indentation.
- Remove empty lines.
- Change all quotes to single or double as defined by user (but not both).
- Change IDs and classes to a single user-defined case.

The CSS beautifier corrects the spacing around the blocks and around the colons and semicolons.

To use it, enter `node cssbeautifier.js (input file) (output file)`.

For example, `node cssbeautifier.js samplesass.scss output.scss`.

Joint todo:
- Replace inconsistent cases across HTML and CSS files.
- Find dead CSS.
