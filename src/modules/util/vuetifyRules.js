function required(v, fieldName) {
  return !!v || `${fieldName} is required`;
}

function lengthBiggerThan(v, fieldName, len) {
  return (v && v.length >= len) || `${fieldName} must have ${len}+ characters`;
}

function email(v) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email must be valid"
}

const passwordRules = [
  v => required(v, 'Password'),
  v => lengthBiggerThan(v, 'Password', 8)
]

const emailRules = [
  v => required(v, 'Email'),
  v => email(v)
]

const nameRules = [
  v => required(v, 'Name'),
  v => lengthBiggerThan(v, 'Name', 5)
]

const requestSubjectRules = [
  v => required(v, 'Subject'),
  v => lengthBiggerThan(v, 'Subject', 5)
]

const requestDescriptionRules = [
  v => required(v, 'Description'),
  v => lengthBiggerThan(v, 'Description', 10)
]
export {
  passwordRules,
  emailRules,
  nameRules,
  requestSubjectRules,
  requestDescriptionRules
}