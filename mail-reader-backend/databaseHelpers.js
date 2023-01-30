const { Client } = require('pg')

const createDatabase = async (client) => {
  try {
    await client.query('CREATE DATABASE mail')
  } catch (error) {
    await client.query(
      `CREATE TABLE IF NOT EXISTS mail(
        received_at timestamp with time zone,
        subject character varying,
        body text,
        "from" character varying,
        thread_id character varying
        )`
    )
  }
}

const establishConnectionToDb = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mail',
    password: 'postgres',
    port: 5432,
  })
  await client.connect()
  return client
}

const saveMail = async (mailData, client) => {
  const subject = mailData.subject
  const body = mailData.body
  const receivedAt = mailData.receivedAt
  const from = mailData.from
  const conversationId = mailData.conversationId
  const res = await client.query(
    `INSERT INTO public.mail(
    subject, body, received_at, "from", thread_id)
    VALUES ($1, $2, $3, $4, $5);`,
    [subject, body, receivedAt, from, conversationId]
  )
  return res
}

const getMail = async (client) => {
  const res = await client.query('SELECT * FROM public.mail')
  return res.rows
}

const getEmailThread = async (client, threadId) => {
  const res = await client.query(
    'SELECT * FROM public.mail WHERE thread_id = $1',
    [threadId]
  )
  return res.rows
}

module.exports = {
  establishConnectionToDb,
  saveMail,
  getMail,
  getEmailThread,
  createDatabase,
}
