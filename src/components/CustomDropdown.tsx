import { Form } from 'react-bootstrap'
import ReactSelect from 'react-select'
import { Tag } from '../App'

type TCustomDropdown = {
  label: string
  isMulti?: boolean
  placeholder: string
  isDisabled?: boolean
  options: Tag[]
  SelectedValue: Tag | Tag[] | null
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onOptionClick: any
}

export const CustomDropdown = ({
  label,
  isMulti = false,
  placeholder,
  options,
  isDisabled = false,
  SelectedValue,
  onOptionClick,
}: TCustomDropdown) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <ReactSelect
        placeholder={placeholder}
        value={SelectedValue}
        options={options}
        onChange={onOptionClick}
        isDisabled={isDisabled}
        isMulti={isMulti}
      />
    </>
  )
}
