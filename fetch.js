const co = require('co')
const aimer = require('aimer')
const path = require('path')
const nugget = require('nugget')
require('shelljs/global')

mkdir('-p', 'data/粗点心战争')

function pget(url) {
  return new Promise((resolve, reject) => {
    nugget(url, {dir: __dirname + '/data/粗点心战争', verbose: true}, err => {
      if (err) {
        return reject(new Error(err))
      }
      resolve()
    })
  })
}

co(function* () {
  const $ = yield aimer('http://bbs.005.tv/thread-492392-1-1.html')
  $('ignore_js_op').find('img').each(function () {
    const el = $(this)
    co(function* () {
      const url = `http://bbs.005.tv/${el.attr('file')}`
      yield pget(`${url}`)
    }).catch(err => console.log(err))
  })
}).catch(err => console.log(err))
