function beautify () {
  var tokenizedFile = readTheFile('samplecss.css')
  var cleanedArray = removeLoneSemicolonsAndBlanks(removeComments(tokenizedFile))

  for (var i = 0; i < cleanedArray.length; i++) {
    if (cleanedArray[i + 1] === '{') {
      console.log(cleanedArray[i] + ' ' + cleanedArray[i + 1])
      i++
    } else if (cleanedArray[i] === '}') {
      console.log(cleanedArray[i] + '\n')
    } else {
      var lineEnd = findLineEnd(cleanedArray, i)
      printLine(cleanedArray, i, lineEnd)
      i += (lineEnd - i)
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

function findLineEnd (array, lineStart) {
  var lineEnd = 0

  for (var j = lineStart; j < array.length; j++) {
    if (array[j][array[j].length - 1] === ';') {
      lineEnd = j
      j = array.length // Force loop to end
    }
  }

  return lineEnd
}

function printLine (array, lineStart, lineEnd) {
  var lineOutput = '  ' + array[lineStart] + ':'

  for (var i = lineStart + 1; i <= lineEnd; i++) {
    lineOutput += ' '
    lineOutput += array[i]
  }

  console.log(lineOutput)
}

beautify()
