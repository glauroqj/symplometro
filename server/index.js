const express = require('express')
const request = require('request')
const HTMLParser = require('node-html-parser')

const app = express()



app.get('/get-information/:site', function(req, res) {
  
  const options = {
    url: 'https://www.'+req.params.site+'.com.br',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  }

  console.log('Visiting page ' + options.url)

  request(options, function(error, response, body) {
    if (error) {
      console.log('< ERROR > ', error)
      res.status(500).send('Something broke!')
    }
  
    console.log('Status code: ' + response.statusCode)
  
    if (response.statusCode === 200) {
      console.log('< DONE > ', typeof body)
      const DOM = HTMLParser.parse(body)
      
      console.log(
        '< FINAL DOM > ',
        DOM.querySelectorAll('h1 span strong')[0].innerHTML
      )
      const payload = {
        data: DOM.querySelectorAll('h1 span strong')[0].innerHTML
      }

      res.status(200).send(payload)
      res.end()
    }
  })

})


app.listen(3000, function() {
  console.log('< SERVER RUNNING >')
})