import { Card, Stack, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Tag } from '../App'
import styles from './Dashboard.module.css'

export type TSavedProfile = {
  tags: Tag[]
  title: string
  id: string
  university: Tag | null
  region: Tag | null
}

export const ViewInfo = ({ profile }: { profile: TSavedProfile }) => {
  const { id, title, tags, university, region } = profile

  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
          {university ? (
            <span className="single-liner-text">
              <b>University: </b>
              {university.label}
            </span>
          ) : null}
          {region ? (
            <span className="single-liner-text">
              <b>State: </b> {region.label}
            </span>
          ) : null}
        </Stack>
      </Card.Body>
    </Card>
  )
}
