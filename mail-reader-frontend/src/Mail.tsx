import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

interface MailProps {
  threadId?: string
}

const Mail: React.FC<MailProps> = ({ threadId }) => {
  const [mail, setMail] = useState([])
  const { mailId } = useParams()

  useEffect(() => {
    if (mailId) {
      axios.get(`/mail/${mailId}`).then((res) => {
        setMail(res.data)
      })
    }
  }, [mailId])

  const content = mail.map((v: any, i) => (
    <Card key={i}>
      <Card.Header>{v.subject}</Card.Header>
      <Card.Body>
        <Card.Text dangerouslySetInnerHTML={{ __html: v.body }}></Card.Text>
      </Card.Body>
    </Card>
  ))

  return <>{content}</>
}

export default Mail
