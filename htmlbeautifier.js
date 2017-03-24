function beautify (argValues) {
  var inputfile = argValues[2]
  var outputfile = argValues[3]

  var tokenizedFile = readFile(inputfile)
  var cleanedArray = separateLines(removeExtraSpaces(removeComments(tokenizedFile)))
  var reversedArray = reverseArray(cleanedArray)
  // console.log(reversedArray)

  clearFile(outputfile)
  var indent = 0

  if (reversedArray[reversedArray.length - 1] === '<!DOCTYPE html>') {
    writeToFile(outputfile, getIndentation(indent) + '<!DOCTYPE html>\n')
    parseBlock(0, reversedArray.length - 1, reversedArray, indent, outputfile)
  } else {
    parseBlock(0, reversedArray.length, reversedArray, indent, outputfile)
  }
}

function parseBlock (start, end, array, indent, outputfile) {
  for (var i = start; i < end; i++) {
    // console.log('i: ' + i)
    if (array[i][1] === '/') {
      // console.log(array[i] + 'block ends at ' + i)
      var endTag = ''
      for (var j = 2; j < array[i].length - 1; j++) {
        endTag += array[i][j]
      }

      for (j = i + 1; j < end; j++) {
        // console.log('j: ' + j)
        // console.log(array[j] + ' includes ' + endTag + '? ', array[j].includes(endTag));
        if (array[j].includes(endTag)) {
          // console.log(array [j] + 'block begins at ' + j)
          writeToFile(outputfile, getIndentation(indent) + '<' + endTag + '>\n')
          indent += 2

          // console.log('parse block from ' + i + ' to ' + j)
          if (j - i === 2) {
            writeToFile(outputfile, getIndentation(indent) + array[i + 1] + '\n')
          } else {
            parseBlock(i + 1, j, array, indent, outputfile)
          }

          indent -= 2
          writeToFile(outputfile, getIndentation(indent) + array[i] + '\n')
          i = end
        }
      }
    }
  }
}

function readFile (filepath) {
  var fs = require('fs')
  return fs.readFileSync(filepath, 'utf8').split(/[\n]+/)
}

function writeToFile (filepath, contents) {
  var fs = require('fs')
  fs.appendFileSync(filepath, contents, function (err) {
    if (err) return console.log(err)
  })
}

function clearFile (filepath) {
  var fs = require('fs')
  fs.writeFileSync(filepath, '')
}

function removeComments (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === '<' && array[i][1] === '!' && array[i][2] === '-' && array[i][3] === '-') {
      var commentEnd = 0
      var commentStart = i

      for (var j = i; j < array.length; j++) {
        if (array[j][array[j].length - 3] === '-' && array[j][array[j].length - 2] === '-' && array[j][array[j].length - 1] === '>') {
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

function removeExtraSpaces (array) {
  var newArray = []

  for (var i = 0; i < array.length; i++) {
    var newToken = ''

    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] === ' ' && array[i][j + 1] === ' ') {
        j++
      } else {
        newToken += array[i][j]
      }
    }

    if (newToken !== '') {
      newArray.push(newToken)
    }
  }

  return newArray
}

function separateLines (array) {
  var longString = ''
  var newArray = []

  for (var i = 0; i < array.length; i++) {
    longString += array[i]
  }

  var newToken = ''

  for (i = 0; i < longString.length; i++) {
    newToken += longString[i]
    if (longString[i] === '>' || longString[i + 1] === '<') {
      newArray.push(newToken)
      newToken = ''
    }
  }

  return newArray
}

function reverseArray (array) {
  var newArray = []

  for (var i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i])
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

beautify(process.argv)
