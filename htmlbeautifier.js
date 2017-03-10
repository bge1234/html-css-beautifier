function beautify (argValues) {
  var inputfile = argValues[2]
  // var outputfile = argValues[3]

  var tokenizedFile = readFile(inputfile)
  var cleanedArray = removeExtraSpaces(removeComments(tokenizedFile))
  console.log(cleanedArray)
}

function readFile (filepath) {
  var fs = require('fs')
  return fs.readFileSync(filepath, 'utf8').split(/[<>\t\n]+/)
}

// function writeToFile (filepath, contents) {
//   var fs = require('fs')
//   fs.appendFileSync(filepath, contents, function (err) {
//     if (err) return console.log(err)
//   })
// }
//
// function clearFile (filepath) {
//   var fs = require('fs')
//   fs.writeFileSync(filepath, '')
// }

function removeComments (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === '!' && array[i][1] === '-' && array[i][2] === '-') {
      var commentEnd = 0
      var commentStart = i

      for (var j = i; j < array.length; j++) {
        if (array[j][array[j].length - 2] === '-' && array[j][array[j].length - 1] === '-') {
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
    if (array[i] !== '' && array[i][0] !== ' ' && array[i][1] !== ' ') {
      var newToken = ''

      for (var j = 0; j < array[i].length; j++) {
        if (array[i][j] === ' ' && array[i][j + 1] === ' ') {
          j++
        } else {
          newToken += array[i][j]
        }
      }

      newArray.push(newToken)
    }
  }

  return newArray
}

beautify(process.argv)
