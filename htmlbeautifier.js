function beautify (argValues) {
  var inputfile = argValues[2]
  var outputfile = argValues[3]

  var tokenizedFile = readFile(inputfile)
  var cleanedArray = cleanArray(tokenizedFile)

  clearFile(outputfile)
  parseArray(cleanedArray, outputfile)
}

function parseArray (array, outputfile) {
  var closeArray = []
  var indent = 0

  for (var i = 0; i < array.length; i++) {
    var startTag = ''
    var endTagPos = -1
    var possibleEndTag = '</'

    if (array[i][1] !== '/') {
      startTag = array[i]
      var startTagNoAttrbute = getStartTagWithoutAttribute(startTag)

      writeToFile(outputfile, getIndentation(indent) + startTag + '\n')

      for (var j = 1; j < startTagNoAttrbute.length; j++) {
        possibleEndTag += startTagNoAttrbute[j]
      }

      endTagPos = findEndTagPos(array, possibleEndTag, i)
      if (endTagPos > -1) {
        indent += 2
        closeArray.splice(0, 0, array[endTagPos])
      }
    }
  }

  writeClosingTags(closeArray, indent, outputfile)
}

function getStartTagWithoutAttribute (startTag) {
  var attributeContents = getAttributeFromTag(startTag)

  if (attributeContents === '') {
    return startTag
  } else {
    var tag = ''

    for (var j = 0; j < startTag.indexOf(attributeContents) - 1; j++) {
      tag += startTag[j]
    }
    tag += '>'

    return tag
  }
}

function writeClosingTags (array, indent, outputfile) {
  for (var i = 0; i < array.length; i++) {
    indent -= 2
    writeToFile(outputfile, getIndentation(indent) + array[i] + '\n')
  }
}

function getAttributeFromTag (tag) {
  var split = tag.split(' ')
  var attribute = ''

  if ((split.length > 1) && (split[1].indexOf('=') !== -1)) {
    for (var i = 0; i < split[1].length - 1; i++) {
      attribute += split[1][i]
    }

    return attribute
  } else {
    return ''
  }
}

function findEndTagPos (array, endTag, startTagPos) {
  for (var i = startTagPos + 1; i < array.length; i++) {
    if (array[i] === endTag) {
      return i
    }
  }

  return -1
}

function readFile (filepath) {
  var fs = require('fs')
  return fs.readFileSync(filepath, 'utf8').split(/[\n]+/)
}

function writeToFile (filepath, contents) {
  var fs = require('fs')
  fs.appendFileSync(filepath, contents)
}

function clearFile (filepath) {
  var fs = require('fs')
  fs.writeFileSync(filepath, '')
}

function removeComments (array, start) {
  for (var i = start; i < array.length; i++) {
    if (array[i][0] === '<' && array[i][1] === '!' && array[i][2] === '-' && array[i][3] === '-') {
      var commentEnd = 0
      var commentStart = i

      for (var j = i; j < array.length; j++) {
        if (array[j][array[j].length - 3] === '-' && array[j][array[j].length - 2] === '-' && array[j][array[j].length - 1] === '>') {
          commentEnd = j
          array.splice(commentStart, (commentEnd - commentStart + 1))
          i = -1
          removeComments(array, j)
          j = array.length
        }
      }
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

function getIndentation (indent) {
  var indentation = ''

  for (var i = 0; i < indent; i++) {
    indentation += ' '
  }

  return indentation
}

function cleanArray (array) {
  var output = []

  output = removeComments(array, 0)
  output = removeExtraSpaces(output)
  output = separateLines(output)

  return output
}

beautify(process.argv)
