import { createSlice } from '@reduxjs/toolkit'
import { Tag } from '../App'

export type TInitialState = {
  selectedUniversity: Tag | null
  selectedRegion: Tag | null
  universities: Tag[]
  regions: Tag[]
}

const initialState: TInitialState = {
  selectedUniversity: null,
  selectedRegion: null,
  universities: [],
  regions: [],
}
export const formFieldSlice = createSlice({
  name: 'formFieldSlice',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.universities = action.payload
    },
    setRegions: (state, action) => {
      state.regions = action.payload
    },
    setSelectedUniversity: (state, action) => {
      state.selectedUniversity = action.payload
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCountries,
  setRegions,
  setSelectedUniversity,
  setSelectedRegion,
} = formFieldSlice.actions

export default formFieldSlice.reducer
