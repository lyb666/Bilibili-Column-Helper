/*
 * MIT License
 *
 * Copyright (c) 2018 Yesterday17
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

const request = require('../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/request').defaults({
  jar: true
})
const fs = require('fs')

function upcover (file, cookies, csrf, callback) {
  request.post(
    'https://member.bilibili.com/x/web/article/upcover',
    {
      form: {
        cover: createBase64Image(fs.readFileSync(file)),
        csrf: csrf
      },
      headers: {
        Origin: 'https://member.bilibili.com',
        Host: 'member.bilibili.com',
        Connection: 'keep-alive',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Referer: 'https://member.bilibili.com/article-text/home?',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        Cookie: cookies
      },
      timeout: 3e4
    },
    (err, response, body) => {
      if (!err) callback(response.body)
    }
  )
}

function addUpdate (cookies, csrf, callback) {
  request.post(
    'http://api.bilibili.com/x/article/creative/draft/addupdate',
    {
      form: {
        title: '==',
        banner_url: '',
        content: '',
        summary: '',
        words: 0,
        category: 0,
        list_id: 0,
        tid: 4,
        reprint: 0,
        tags: [],
        image_urls: '',
        origin_image_urls: '',
        dynamic_intro: '',
        csrf: csrf
      },
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Cookie: cookies,
        Host: 'api.bilibili.com',
        Origin: 'http://member.bilibili.com',
        Referer: 'http://member.bilibili.com/article-text/home?',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36'
      }
    },
    (err, response, body) => {
      if (!err) callback(response.body)
    }
  )
}

function createBase64Image (stream) {
  return 'data:image/bmp;base64,' + stream.toString('base64')
}

exports.upcover = upcover
exports.addUpdate = addUpdate
