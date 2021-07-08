var myModule = require('./my-module.js')
var _ = require('lodash')

console.log('Text from my-module: ', myModule.myText)
console.log('Text from lodash: ', _.random(1,100))