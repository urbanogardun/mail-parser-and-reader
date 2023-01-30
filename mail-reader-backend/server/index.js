const express = require('express')
const {
  getMail,
  establishConnectionToDb,
  getEmailThread,
} = require('../databaseHelpers')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/mail', async (req, res) => {
  const client = await establishConnectionToDb()
  const mail = await getMail(client)
  res.json(mail)
})

app.get('/mail/:id', async (req, res) => {
  const client = await establishConnectionToDb()
  const thread = await getEmailThread(client, req.params.id)
  res.json(thread)
})
