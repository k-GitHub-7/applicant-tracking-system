import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Tag } from '../App'
import { CustomDropdown } from '../components/CustomDropdown'
import { Col, Form } from 'react-bootstrap'
import {
  setSelectedRegion,
  setSelectedUniversity,
  setRegions,
  setCountries,
  TInitialState,
} from '../redux/formFieldSlice'

const DEFAULT_COUNTRY = 'India'
const GET_REGION_URL = 'https://countriesnow.space/api/v0.1/countries/states'
const GET_UNIV_URL = 'http://universities.hipolabs.com/search?country=India'

type TRegion = {
  name: string
  state_code: string
}

type TUniversity = {
  name: string
}

type TArgs = { savedUniversity: Tag | null; savedRegion: Tag | null }

type TFormData = {
  UniversityDropdown: () => JSX.Element
  RegionDropdown: () => JSX.Element
  selectedUniversity: Tag | null
  selectedRegion: Tag | null
}

export const useFormFields = ({
  savedUniversity,
  savedRegion,
}: TArgs): TFormData => {
  const dispatch = useDispatch()

  const { selectedUniversity, selectedRegion, universities, regions } =
    useSelector(
      (state: { formFieldReducer: TInitialState }) => state.formFieldReducer
    )

  // To set saved values while editing university
  useEffect(() => {
    dispatch(setSelectedUniversity(savedUniversity))
    dispatch(setSelectedRegion(savedRegion))
  }, [])

  const onUniversitySelect = (val: Tag) => {
    dispatch(setSelectedUniversity(val))
  }
  const onRegionSelect = (val: Tag) => {
    dispatch(setSelectedRegion(val))
  }

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data: response } = await axios.get(GET_UNIV_URL)
        const val = response.map(({ name }: TUniversity) => {
          const id = name.toUpperCase().replaceAll(' ', '_')
          return { label: name, id, value: name }
        })
        dispatch(setCountries(val))
      } catch (error) {
        console.log('Error while fetching universities: ', error)
      }
    }

    fetchUniversities()
  }, [])

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data: response } = await axios.post(GET_REGION_URL, {
          country: DEFAULT_COUNTRY,
        })
        const val: Tag[] = response.data.states.map(
          ({ name, state_code }: TRegion) => ({
            label: name,
            value: name,
            id: state_code,
          })
        )
        dispatch(setRegions(val))
      } catch (error) {
        console.log('Error while fetching states: ', error)
      }
    }

    fetchRegions()
  }, [selectedUniversity])

  const UniversityDropdown = () => (
    <Col>
      <Form.Group controlId="universities">
        <CustomDropdown
          label="University"
          placeholder="Select University..."
          options={universities}
          SelectedValue={selectedUniversity}
          onOptionClick={onUniversitySelect}
        />
      </Form.Group>
    </Col>
  )

  const RegionDropdown = () => (
    <Col>
      <Form.Group controlId="region">
        <CustomDropdown
          label="State"
          placeholder="Select State..."
          options={regions}
          SelectedValue={selectedRegion}
          onOptionClick={onRegionSelect}
        />
      </Form.Group>
    </Col>
  )

  return {
    UniversityDropdown,
    RegionDropdown,
    selectedUniversity,
    selectedRegion,
  }
}
