const DEFAULT_TECH_STACK = Object.freeze({
  REACT: 'init-react-id',
  TYPESCRIPT: 'init-ts-id',
  MONGO_DB: 'init-mongo-db-id',
})

export const INIT_TAG = [
  { id: DEFAULT_TECH_STACK.REACT, label: 'React', value: 'React' },
  {
    id: DEFAULT_TECH_STACK.TYPESCRIPT,
    label: 'Typescript',
    value: 'Typescript',
  },
  { id: DEFAULT_TECH_STACK.MONGO_DB, label: 'MongoDB', value: 'MongoDB' },
]
export const INIT_PROFILE = [
  {
    title: 'Robert Spacey',
    markdown: ` - Profile evaluation remaining`,
    id: 'init-profile-id',
    tagIds: [
      DEFAULT_TECH_STACK.REACT,
      DEFAULT_TECH_STACK.TYPESCRIPT,
      DEFAULT_TECH_STACK.MONGO_DB,
    ],
    university: {
      id: 'MANIPAL_UNIVERSITY',
      label: 'Manipal University',
      value: 'Manipal University',
    },
    region: { id: 'KA', label: 'Karnataka', value: 'Karnataka' },
  },
]
