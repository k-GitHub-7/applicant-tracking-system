import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { TProfileData, Tag } from '../App'
import { CustomCreatableDropdown } from '../components/CustomCreatableDropdown'
import { useFormFields } from '../hooks/useFormFields'

type TNewProfileData = {
  onSubmit: (data: TProfileData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<TProfileData>

export const NewProfileForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  markdown = '',
  tags = [],
  university = null,
  region = null,
}: TNewProfileData) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [newTags, setNewTags] = useState<Tag[]>(tags)

  const {
    UniversityDropdown,
    RegionDropdown,
    selectedUniversity,
    selectedRegion,
  } = useFormFields({
    savedUniversity: university,
    savedRegion: region,
  })

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: newTags,
      university: selectedUniversity,
      region: selectedRegion,
    })

    navigate('..')
  }
  const onCreateOption = (label: string) => {
    const newTag = { id: uuidV4(), label, value: label }
    onAddTag(newTag)
    setNewTags((prev) => [...prev, newTag])
  }

  const onTechnologySelect = (tags: Tag[]) => {
    setNewTags(tags)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Candidate Name</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="technologyTags">
              <CustomCreatableDropdown
                label="Tech Stack"
                onCreateOption={onCreateOption}
                value={newTags}
                dropdownOptions={availableTags}
                onDropdownChange={onTechnologySelect}
                isMulti={true}
              />
            </Form.Group>
          </Col>
          <UniversityDropdown />
          <RegionDropdown />
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Details</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
