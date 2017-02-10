function beautify () {
  var tokenizedFile = readTheFile('samplesass.scss')
  var cleanedArray = removeLoneSemicolonsAndBlanks(removeComments(tokenizedFile))

  parse(cleanedArray)
}

function readTheFile (filename) {
  var fs = require('fs')
  return fs.readFileSync(filename, 'utf8').split(/[\s\n:]+/)
}

function parse (array) {
  var indent = 0

  for (var i = 0; i < array.length; i++) {
    if (array[i + 1] === '{') {
      console.log(getIndentation(indent) + array[i] + ' {')
      indent += 2
      i++
    } else if (array[i + 1] === '}') {
      console.log(getIndentation(indent) + '}')
      indent -= 2
      i++
    } else {
      console.log(getIndentation(indent) + '  the property is ', array[i])
      i++

      // console.log(getIndentation(indent) + '  ' + array[i] + ': ' + array[i + 1])
      // i += 2
    }
  }
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

function findBlockEnd (array, blockStart) {
  var blockEnd = 0

  for (var j = blockStart; j < array.length; j++) {
    if (array[j] === '}') {
      blockEnd = j
      j = array.length
    }
  }

  return blockEnd
}

function printBlock (array, position, blockEnd, indent) {
  var indentation = getIndentation(indent)

  if (array[position] !== '}') {
    console.log(indentation + array[position] + ' {')
    position += 2

    for (var i = position; i < blockEnd; i++) {
      if (array[i + 1] === '{') {
        var innerBlockEnd = findBlockEnd(array, i)
        printBlock(array, i, innerBlockEnd, (indent + 2))
        i += (innerBlockEnd - i)
      } else {
        var lineEnd = findLineEnd(array, i)
        printLine(array, i, lineEnd, (indent + 2))
        i += (lineEnd - i)
      }
    }

    console.log(indentation + '}')
  }
}

function findLineEnd (array, lineStart) {
  var lineEnd = 0

  for (var j = lineStart; j < array.length; j++) {
    if (array[j][array[j].length - 1] === ';') {
      lineEnd = j
      j = array.length
    }
  }

  return lineEnd
}

function printLine (array, lineStart, lineEnd, indent) {
  var indentation = getIndentation(indent)
  var lineOutput = indentation + array[lineStart] + ':'

  for (var i = lineStart + 1; i <= lineEnd; i++) {
    lineOutput += ' '
    lineOutput += array[i]
  }

  console.log(lineOutput)
}

function getIndentation (indent) {
  var indentation = ''

  for (var i = 0; i < indent; i++) {
    indentation += ' '
  }

  return indentation
}

beautify()
