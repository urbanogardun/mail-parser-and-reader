import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

// import logo from './logo.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [mail, setMail] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/mail').then((res) => {
      const { data } = res
      setMail(data)
    })
  }, [])

  const handleClick = (mailId: string) => navigate(`/mail/${mailId}`)

  const mails = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>from</th>
          <th>subject</th>
          <th>received at</th>
        </tr>
      </thead>
      <tbody>
        {mail.map((v: any, i) => (
          <tr onClick={() => handleClick(v.thread_id)} key={i}>
            <td>{v.from}</td>
            <td>{v.subject}</td>
            <td>{v.received_at}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  return (
    <div>
      <h1>Mail</h1>
      {mails}
    </div>
  )
}

export default App
