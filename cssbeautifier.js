function beautify () {
  var tokenizedFile = readTheFile('samplesass.scss')
  var cleanedArray = removeLoneSemicolonsAndBlanks(removeComments(fixPseudoClasses(findChildSelectors(tokenizedFile))))

  if (cleanedArray[1] !== '{') {
    console.log('not valid CSS/SASS')
  } else {
    var indent = 0

    console.log('NOTE: Only the slashes on single-line (//) comments are removed. Multi-line comments are removed entirely.\n')

    console.log(getIndentation(indent) + cleanedArray[0] + ' ' + cleanedArray[0 + 1])
    for (var i = 2; i < cleanedArray.length; i++) {
      if (cleanedArray[i] !== '}') {
        if (cleanedArray[i - 1] !== '}' && cleanedArray[i - 1][cleanedArray[i - 1].length - 1] !== ';') {
          indent += 2
        }

        if (cleanedArray[i + 1] !== '{') {
          if (cleanedArray[i] === 'margin' || cleanedArray[i] === 'padding') {
            if (cleanedArray[i + 2][0] !== '0' && cleanedArray[i + 2][0] !== '1' && cleanedArray[i + 2][0] !== '2' && cleanedArray[i + 2][0] !== '3' && cleanedArray[i + 2][0] !== '4' && cleanedArray[i + 2][0] !== '5' && cleanedArray[i + 2][0] !== '6' && cleanedArray[i + 2][0] !== '7' && cleanedArray[i + 2][0] !== '8' && cleanedArray[i + 2][0] !== '9' && cleanedArray[i + 2][0] !== 'a') {
              console.log(getIndentation(indent) + cleanedArray[i] + ': ' + cleanedArray[i + 1])
            } else if (cleanedArray[i + 3][0] !== '0' && cleanedArray[i + 3][0] !== '1' && cleanedArray[i + 3][0] !== '2' && cleanedArray[i + 3][0] !== '3' && cleanedArray[i + 3][0] !== '4' && cleanedArray[i + 3][0] !== '5' && cleanedArray[i + 3][0] !== '6' && cleanedArray[i + 3][0] !== '7' && cleanedArray[i + 3][0] !== '8' && cleanedArray[i + 3][0] !== '9' && cleanedArray[i + 3][0] !== 'a') {
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
        if (cleanedArray[i + 1] !== '}') {
          console.log(' ')
        }
      }
    }
  }

  checkCase(cleanedArray)
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

function fixPseudoClasses (array) {
  var newArray = []

  for (var i = 0; i < array.length - 1; i++) {
    if (array[i + 1] === 'active' || array[i + 1] === 'any' || array[i + 1] === 'checked' || array[i + 1] === 'default' || (array[i + 1][0] === 'd' && array[i + 1][1] === 'i' && array[i + 1][2] === 'r') || array[i + 1] === 'disabled' || array[i + 1] === 'empty' || array[i + 1] === 'enabled' || array[i + 1] === 'first' || array[i + 1] === 'first-child' || array[i + 1] === 'first-of-type' || array[i + 1] === 'fullscreen' || array[i + 1] === 'focus' || array[i + 1] === 'hover' || array[i + 1] === 'indeterminate' || array[i + 1] === 'in-range' || array[i + 1] === 'invalid' || (array[i + 1][0] === 'l' && array[i + 1][1] === 'a' && array[i + 1][2] === 'n' && array[i + 1][3] === 'g') || array[i + 1] === 'last-child' || array[i + 1] === 'last-of-type' || array[i + 1] === 'left' || array[i + 1] === 'link' || (array[i + 1][0] === 'n' && array[i + 1][1] === 'o' && array[i + 1][2] === 't') || (array[i + 1][0] === 'n' && array[i + 1][1] === 't' && array[i + 1][2] === 'h') || array[i + 1] === 'only-child' || array[i + 1] === 'only-of-type' || array[i + 1] === 'optional' || array[i + 1] === 'out-of-range' || array[i + 1] === 'read-only' || array[i + 1] === 'read-write' || array[i + 1] === 'required' || array[i + 1] === 'right' || array[i + 1] === 'root' || array[i + 1] === 'scope' || array[i + 1] === 'target' || array[i + 1] === 'valid' || array[i + 1] === 'visited') {
      newArray.push(array[i] + ':' + array[i + 1])
      i++
    } else {
      newArray.push(array[i])
    }
  }

  return newArray
}

function findChildSelectors (array) {
  var newArray = []

  for (var i = 0; i < array.length; i++) {
    if (array[i + 1] === '>') {
      newArray.push(array[i] + ' ' + array[i + 1] + ' ' + array[i + 2])
      i += 2
    } else {
      newArray.push(array[i])
    }
  }

  return newArray
}

function getIndentation (indent) {
  var indentation = ''

  for (var i = 0; i < indent; i++) {
    indentation += ' '
  }

  return indentation
}

function checkCase (array) {
  var classArray = []
  var idArray = []
  var classCase = 'camel'
  var idCase = 'camel'

  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === '.') {
      classArray.push(array[i])
    } else if (array[i][0] === '#') {
      idArray.push(array[i])
    }
  }

  if (classArray[0].indexOf('-') >= 0) {
    classCase = 'dash'
  }

  for (i = 1; i < classArray.length; i++) {
    if ((classArray[i].indexOf('-') >= 0 && classCase === 'camel') || (classArray[i].indexOf('-') === -1 && classCase === 'dash')) {
      i = classArray.length
      console.log('Classes are not the same case (camel case vs. dashed)')
    }
  }

  if (idArray[0].indexOf('-') >= 0) {
    idCase = 'dash'
  }

  for (i = 1; i < idArray.length; i++) {
    if ((idArray[i].indexOf('-') >= 0 && idCase === 'camel') || (idArray[i].indexOf('-') === -1 && idCase === 'dash')) {
      i = idArray.length
      console.log('IDs are not the same case (camel case vs. dashed)')
    }
  }
}

beautify()
