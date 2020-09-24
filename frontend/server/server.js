const path = require('path')
const fs = require('fs')

const express = require('express')
const app = express();

const React = require('react')
const ReactDOMServer = require('react-dom/server')
import { StaticRouter, matchPath } from 'react-router-dom'

import App from '../src/App'
const PORT = 8080

app.use(express.static(path.resolve(__dirname, '..', 'build', 'public')))

app.use((req, res, next) => {    
    fs.readFile(path.resolve('./build/template.html'), 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send("Server")
        }
        const context = {}
        const html = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}><App /></StaticRouter>)
        
        return res.send(data.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div>`
        ))
    })
})

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})