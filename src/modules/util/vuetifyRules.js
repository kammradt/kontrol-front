function required(v, fieldName) {
  return !!v || `${fieldName} is required`;
}

function lengthBiggerThan(v, fieldName, len) {
  return (v && v.length >= 8) || `${fieldName} must have ${len}+ characters`;
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

export {
  passwordRules,
  emailRules
}