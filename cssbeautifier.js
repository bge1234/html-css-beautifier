function beautify () {
  var tokenizedFile = readTheFile('samplesass.scss')
  var cleanedArray = removeLoneSemicolonsAndBlanks(removeComments(tokenizedFile))

  // for (var i = 0; i < cleanedArray.length; i++) {
  //   console.log(cleanedArray[i] + ' (' + i + ')')
  // }
  // console.log('==========')

  if (cleanedArray[1][0] !== '{') {
    console.log('not valid CSS/SASS')
  } else {
    var indent = 0

    console.log(getIndentation(indent) + cleanedArray[0] + ' ' + cleanedArray[0 + 1])
    for (var i = 2; i < cleanedArray.length; i++) {
      if (cleanedArray[i] !== '}') {
        if (cleanedArray[i - 1] !== '}' && cleanedArray[i - 1][cleanedArray[i - 1].length - 1] !== ';') {
          indent += 2
        }

        if (cleanedArray[i + 1] !== '{') {
          console.log(getIndentation(indent) + cleanedArray[i] + ': ' + cleanedArray[i + 1])
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
