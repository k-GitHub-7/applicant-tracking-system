import { TProfileData, Tag } from '../App'
import { NewProfileForm } from '../dashboard/NewProfileForm'

type TAddNewProfile = {
  onSubmit: (data: TProfileData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const AddProfile = ({
  onSubmit,
  onAddTag,
  availableTags,
}: TAddNewProfile) => {
  return (
    <>
      <h1 className="mb-4">New Candidate Profile</h1>
      <NewProfileForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
