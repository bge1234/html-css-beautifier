function beautify () {
  var tokenizedFile = readTheFile('samplesass.scss')
  var cleanedArray = removeLoneSemicolonsAndBlanks(removeComments(tokenizedFile))

  if (cleanedArray[1] !== '{') {
    console.log('not valid CSS/SASS')
  } else {
    var indent = 0

    console.log('NOTE: Single line (//) comments are not removed, just the slashes are. Multi-line comments are removed entirely.\n')

    console.log(getIndentation(indent) + cleanedArray[0] + ' ' + cleanedArray[0 + 1])
    for (var i = 2; i < cleanedArray.length; i++) {
      if (cleanedArray[i] !== '}') {
        if (cleanedArray[i - 1] !== '}' && cleanedArray[i - 1][cleanedArray[i - 1].length - 1] !== ';') {
          indent += 2
        }

        if (cleanedArray[i + 1] !== '{') {
          if (cleanedArray[i] === 'margin' || cleanedArray[i] === 'padding') {
            if (cleanedArray[i + 3] !== '0' && cleanedArray[i + 3] !== '1' && cleanedArray[i + 3] !== '2' && cleanedArray[i + 3] !== '3' && cleanedArray[i + 3] !== '4' && cleanedArray[i + 3] !== '5' && cleanedArray[i + 3] !== '6' && cleanedArray[i + 3] !== '7' && cleanedArray[i + 3] !== '8' && cleanedArray[i + 3] !== '9' && cleanedArray[i + 3] !== 'auto') {
              console.log(getIndentation(indent) + cleanedArray[i] + ': ' + cleanedArray[i + 1] + ' ' + cleanedArray[i + 2])
              i++
            } else {
              console.log(getIndentation(indent) + cleanedArray[i] + ': ' + cleanedArray[i + 1] + ' ' + cleanedArray[i + 2] + ' ' + cleanedArray[i + 3] + ' ' + cleanedArray[i + 4])
              i += 3
            }
          } else {
            console.log(getIndentation(indent) + cleanedArray[i] + ': ' + cleanedArray[i + 1])
          }
        } else {
          console.log(getIndentation(indent) + cleanedArray[i] + ' ' + cleanedArray[i + 1])
        }
        i++
      } else {
        indent -= 2
        console.log(getIndentation(indent) + '}')
      }
    }
  }
}

function readTheFile (filename) {
  var fs = require('fs')
  return fs.readFileSync(filename, 'utf8').split(/[\s\n:]+/)
}

function removeLoneSemicolonsAndBlanks (array) {
  var newArray = []

  for (var i = 1; i < array.length + 1; i++) {
    if (array[i] === ';') {
      newArray.push(array[i - 1] + ';')
      i++
    } else if (array[i - 1] !== '') {
      newArray.push(array[i - 1])
    }
  }

  return newArray
}

function removeComments (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === '/' && array[i][1] === '*') {
      var commentEnd = 0
      var commentStart = i

      for (var j = i; j < array.length; j++) {
        if (array[j][array[j].length - 2] === '*' && array[j][array[j].length - 1] === '/') {
          commentEnd = j
          j = array.length
        }
      }

      array.splice(commentStart, (commentEnd - commentStart + 1))
      i = commentEnd - commentStart + 1
    }
  }

  for (i = 0; i < array.length; i++) {
    if (array[i][0] === '/' && array[i][1] === '/') {
      array.splice(i, 1)
      i--
    }
  }

  return array
}

function getIndentation (indent) {
  var indentation = ''

  for (var i = 0; i < indent; i++) {
    indentation += ' '
  }

  return indentation
}

beautify()
