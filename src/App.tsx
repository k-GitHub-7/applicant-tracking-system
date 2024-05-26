import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'

import { Routes, Route, Navigate } from 'react-router-dom'

import { useLocalStorage } from './hooks/useLocalStorage'
import { v4 as uuidV4 } from 'uuid'

import { EditProfile } from './edit-profile/EditProfile'
import { Dashboard } from './dashboard/Dashboard'
import { AddProfile } from './add-profile/AddProfile'
import { ViewSavedProfile } from './view-profile/ViewSavedProfile'
import { ViewProfileById } from './view-profile/ViewProfileById'
import { INIT_PROFILE, INIT_TAG } from './constants'

export type TNewProfile = {
  id: string
} & TProfileData

export type TProfileData = {
  tags: Tag[]
} & TCommonFields

export type TFormControl = {
  id: string
  tagIds: string[]
} & TCommonFields

type TCommonFields = {
  title: string
  markdown: string
  university: Tag | null
  region: Tag | null
}

export type Tag = {
  id: string
  label: string
  value: string
}

const App = () => {
  const [ProfileData, setProfileData] = useLocalStorage<TFormControl[]>(
    'PROFILES',
    INIT_PROFILE
  )
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', INIT_TAG)

  const notesWithTags = useMemo(() => {
    return ProfileData.map((data) => {
      return {
        ...data,
        tags: tags.filter((tag) => data.tagIds.includes(tag.id)),
      }
    })
  }, [ProfileData, tags])

  const onCreateNote = ({ tags, ...data }: TProfileData) => {
    setProfileData((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: TProfileData) => {
    setProfileData((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDelete = (id: string) => {
    setProfileData((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }

  return (
    <Container className="my-4 main-page-container">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              profiles={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/add-profile"
          element={
            <AddProfile
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/:id"
          element={<ViewProfileById profileData={notesWithTags} />}
        >
          <Route index element={<ViewSavedProfile onDelete={onDelete} />} />
          <Route
            path="edit"
            element={
              <EditProfile
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
