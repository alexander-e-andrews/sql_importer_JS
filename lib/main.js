//'use strict';
const fs = require('fs')
const path = require('path')

const startTag = '-- name: '
const endTag = '-- end'

const entriesRegExp = new RegExp(('(?<=' + startTag + ').*?(?=' + endTag +')'), 'sg')

/**
 * Return regexp matches between starts and ends
 * @param {string} str 
 */
function betweenStartAndEnd(str){
    let betweens = []
    let myArray
    while ((myArray = entriesRegExp.exec(str)) !== null) {
        betweens.push(myArray[0])
      }
    return betweens
}

/**
 * After betweenStartAndEnd will extract the name of the item
 * @param {string} str 
 */
function getName(str){
    return str.substring(0, str.indexOf('\r\n'))
}

/**
 * After getName will return the body
 * @param {string} str 
 */
function getBody(str){
    return str.substring(str.indexOf('\r\n') + 2, str.lastIndexOf('\r\n'))
}

function parseIntoObject(str){
    let fObj = {}

    let a = betweenStartAndEnd(str)
    for(let b of a){
        fObj[getName(b)] = getBody(b)
    }
    return fObj
}

export default function createObject(fileName){
    let p = path.resolve(process.cwd(), fileName)
    let encoding = 'utf-8'

    return parseIntoObject(fs.readFileSync(p, { encoding }))
}