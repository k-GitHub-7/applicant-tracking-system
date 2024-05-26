import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { TNewProfile } from '../App'

type TViewProfileLayout = {
  profileData: TNewProfile[]
}

export function ViewProfileById({ profileData }: TViewProfileLayout) {
  const { id } = useParams()
  const selectedProfile = profileData.find((n) => n.id === id)

  if (selectedProfile == null) {
    return <Navigate to="/" replace />
  }

  return <Outlet context={selectedProfile} />
}

export const useViewProfileById = () => {
  return useOutletContext<TNewProfile>()
}
