import { useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import company_logo from '../assets/company_logo.png'

import { Tag } from '../App'
import { useFormFields } from '../hooks/useFormFields'
import { ViewInfo, TSavedProfile } from './ViewInfo'
import { CustomDropdown } from '../components/CustomDropdown'
import './Dashboard.module.css'
import { EditUniversityModal } from '../edit-profile/EditProfileModal'

const NO_UNIVERSITY_FOUND_LABEL =
  'No profiles found for searched criteria. Please add a profile or modify filters.'

type TProfileList = {
  availableTags: Tag[]
  profiles: TSavedProfile[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function Dashboard({
  availableTags,
  profiles,
  onUpdateTag,
  onDeleteTag,
}: TProfileList) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState<string>('')
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState<boolean>(false)

  const {
    UniversityDropdown,
    RegionDropdown,
    selectedUniversity,
    selectedRegion,
  } = useFormFields({ savedUniversity: null, savedRegion: null })

  const onTechnologySelect = (tags: Tag[]) => {
    setSelectedTags(tags)
  }

  const filterProfile = useMemo(() => {
    return profiles.filter((j) => {
      console.log(j, selectedRegion)
      return (
        (title === '' || j.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            j.tags.some((profileTag) => profileTag.id === tag.id)
          )) &&
        (selectedUniversity === null ||
          selectedUniversity.id === j.university?.id) &&
        (selectedRegion === null || selectedRegion.id === j.region?.id)
      )
    })
  }, [title, selectedTags, selectedUniversity, selectedRegion, profiles])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>
            <img src={company_logo} alt="Company Logo" />
            Applicant Tracking System
          </h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/add-profile">
              <Button variant="primary">Add Profile</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Keywords
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <hr style={{ color: '#27438f' }} />
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Candidate Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="technologyTags">
              <CustomDropdown
                label="Tech Stack"
                placeholder="Select Keyword..."
                SelectedValue={selectedTags}
                options={availableTags}
                onOptionClick={onTechnologySelect}
                isMulti={true}
              />
            </Form.Group>
          </Col>
          <UniversityDropdown />
          <RegionDropdown />
        </Row>
      </Form>
      <Form.Label>Profiles</Form.Label>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filterProfile.length > 0 ? (
          filterProfile.map((p) => (
            <Col key={p.id}>
              <ViewInfo profile={p} />
            </Col>
          ))
        ) : (
          <div className="alert alert-secondary" role="alert">
            {NO_UNIVERSITY_FOUND_LABEL}
          </div>
        )}
      </Row>
      <EditUniversityModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  )
}
