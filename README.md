# A CSS and HTML beautifier/linter built by developers at Allstate's CompoZed Labs

CSS todo:
- It should still work if things are on the same line with no spaces.

HTML todo:
- Handle `<!DOCTYPE html>` tag.

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
