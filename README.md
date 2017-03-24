# A CSS and HTML beautifier/linter built by developers at Allstate's CompoZed Labs

HTML todo:
- Handle `<!DOCTYPE html>` tag.
- Include attributes with output elements.
- Handle nested elements of the same type.

CSS todo:
- Should still work if things are on the same line with no spaces.

Joint todo:
- Replace inconsistent cases across HTML and CSS files.
- Find dead CSS.

==

The HTML beautifier does the following things:
- Correct indentation/spacing.
- Remove empty lines.
- Change all quotes to single or double as defined by user (but not both).
- Change IDs and classes to a single user-defined case.

To use it, enter `node htmlbeautifier.js (input file) (output file)`.

For example, `node htmlbeautifier.js samplehtml.html output.html`.

==

The CSS beautifier corrects the spacing around the blocks and around the colons and semicolons.

To use it, enter `node cssbeautifier.js (input file) (output file)`.

For example, `node cssbeautifier.js samplesass.scss output.scss`.
