import CreatableReactSelect from 'react-select/creatable'
import { Tag } from '../App'
import { Form } from 'react-bootstrap'

type TCustomCreatableDropdown = {
  label: string
  onCreateOption: (label: string) => void
  value: Tag | Tag[]
  dropdownOptions: Tag[]
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onDropdownChange: any
  isMulti?: boolean
}

export const CustomCreatableDropdown = ({
  label,
  onCreateOption,
  value,
  dropdownOptions,
  onDropdownChange,
  isMulti = false,
}: TCustomCreatableDropdown) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <CreatableReactSelect
        onCreateOption={onCreateOption}
        value={value}
        options={dropdownOptions}
        onChange={onDropdownChange}
        isMulti={isMulti}
      />
    </>
  )
}
