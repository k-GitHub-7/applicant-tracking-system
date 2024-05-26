import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useViewProfileById } from './ViewProfileById'
import ReactMarkdown from 'react-markdown'

type TNewProfile = {
  onDelete: (id: string) => void
}

export const ViewSavedProfile = ({ onDelete }: TNewProfile) => {
  const { markdown, id, title, tags, university, region } = useViewProfileById()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Candidate: {title}</h1>
          <b>University: </b>
          <span>{university?.label ?? 'None'}</span><br/>
          <b>Location: </b>
          <span>{region?.label ?? 'None'}</span><br/>
          <b>Tech Stack:</b>
          {tags.length > 0 ? (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags.map(({ id, label }) => (
                <Badge className="text-truncate" key={id}>
                  {label}
                </Badge>
              ))}
            </Stack>
          ) : (
            ' None'
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(id)
                navigate('/')
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <>
        <b>Description:</b> <ReactMarkdown>{markdown}</ReactMarkdown>
      </>
    </>
  )
}
