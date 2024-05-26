import { TProfileData, Tag } from '../App'
import { NewProfileForm } from '../dashboard/NewProfileForm'
import { useViewProfileById } from '../view-profile/ViewProfileById'

type TEditProfile = {
  onSubmit: (id: string, data: TProfileData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const EditProfile = ({
  onSubmit,
  onAddTag,
  availableTags,
}: TEditProfile) => {
  const { title, markdown, tags, id, university, region } = useViewProfileById()
  return (
    <>
      <h1 className="mb-4">Edit Candidate Profile</h1>
      <NewProfileForm
        title={title}
        markdown={markdown}
        tags={tags}
        university={university}
        region={region}
        onSubmit={(data) => onSubmit(id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
