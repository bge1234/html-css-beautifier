function linter () {
  var tokenizedFile = readTheFile('samplecss.css')

  if (tokenizedFile[1] !== '{' || tokenizedFile[tokenizedFile.length - 2] !== '}') {
    console.log('Syntax error')
  } else {
    var startingBrace = 0
    var endingBrace = 0

    for (var i = 0; i < tokenizedFile.length - 1; i++) {
      if (tokenizedFile[i][0] === '/' && tokenizedFile[i][1] === '*') {
        console.log('comment found')
      } else if (tokenizedFile[i + 1] === '{') {
        console.log(tokenizedFile[i] + ' ' + tokenizedFile[i + 1])
        startingBrace = 1
        i++

        // Find the end of the block
        for (var j = i; j < tokenizedFile.length; j++) {
          if (tokenizedFile[j] === '}' && endingBrace === 0) {
            endingBrace = j
          }
        }
      } else if (tokenizedFile[i] === '}') {
        console.log(tokenizedFile[i])
      } else if ((tokenizedFile[i] === 'margin' || tokenizedFile[i] === 'padding') && (endingBrace - startingBrace) % 2 === 0) {
        if (tokenizedFile[i + 3][0] !== '0' && tokenizedFile[i + 3][0] !== '1' && tokenizedFile[i + 3][0] !== '2' && tokenizedFile[i + 3][0] !== '3' && tokenizedFile[i + 3][0] !== '4' && tokenizedFile[i + 3][0] !== '5' && tokenizedFile[i + 3][0] !== '6' && tokenizedFile[i + 3][0] !== '7' && tokenizedFile[i + 3][0] !== '8' && tokenizedFile[i + 3][0] !== '9') {
          console.log('  ' + tokenizedFile[i] + ': ' + tokenizedFile[i + 1] + ' ' + tokenizedFile[i + 2])
          i += 2
        } else {
          console.log('  ' + tokenizedFile[i] + ': ' + tokenizedFile[i + 1] + ' ' + tokenizedFile[i + 2] + ' ' + tokenizedFile[i + 3] + ' ' + tokenizedFile[i + 4])
          i += 4
        }
      } else {
        console.log('  ' + tokenizedFile[i] + ': ' + tokenizedFile[i + 1])
        i++
      }
    }
  }
}

function readTheFile (filename) {
  var fs = require('fs')
  return fs.readFileSync(filename, 'utf8').split(/[\s\n;:]+/)
}

linter()
