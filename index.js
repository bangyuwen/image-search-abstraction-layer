import fetch from 'isomorphic-fetch'
import { SearchModel as Search } from './searchSchema.js'
import express from 'express'
const app = express()

app.get('/api/search', (req, res) => {
  const key = process.env.key
  const cx = process.env.cx
  const query = req.query.q
  const start = req.query.offset || 1
  let search = new Search({
    query: query,
    time: new Date()
  })
  search.save()
  fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}&start=${start}&searchType=image&alt=json`)
  .then(raw => raw.json())
  .then(data => data.items.map(res => {
    return {
      link: res.link,
      snippet: res.snippet,
      context: res.image.contextLink
    }
  }))
  .then(data => {
    res.send(data)
  })
})

app.get('/api/latest', (req, res) => {
  let query = Search.find().sort({_id: -1}).limit(10).exec((err, data) => {
    res.send(query.emitted.fulfill)
  })
})

const server = app.listen(process.env.port || 8080, () => {
  const port = server.address().port
  console.log(`App is now running on port${port}`)
})
