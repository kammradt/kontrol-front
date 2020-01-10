import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({ duration: 4000 })

const SUCCESS_ENUM_OPTIONS = {
    DOING_LOGIN: 'Logging...',
    ACCOUNT_CREATED: 'Account created!',
    PROFILE_UPDATED: 'Profile updated!',
    PASSWORD_UPDATED: 'Password updated!',
    
    LOGIN_AGAIN_REQUIRED: 'Please, login with your new information!',
    LOGIN_REQUIRED: 'Please, login first!',

    REQUEST_CREATED: 'Request created!',
    REQUEST_UPDATED: 'Request updated!',
    REQUEST_DELETED: 'Request Deleted!',
    FILES_UPLOADED: 'File uploaded!',
    STAGE_ADDED: 'Stage added!',
    STAGE_DELETED: 'Stage Deleted!',

    DEFAULT: 'Success!!'
}

function showMultipleErrors(errorsMessages) {
    errorsMessages.forEach(errorMessage => notyf.error(errorMessage))
}

function showError(errorMessage) {
    notyf.error(errorMessage)
}

function showSuccess(enumSuccess) {
    let sucessMessage = SUCCESS_ENUM_OPTIONS[enumSuccess] || SUCCESS_ENUM_OPTIONS['DEFAULT']
    notyf.success(sucessMessage)
}

export {
    showMultipleErrors,
    showError,
    showSuccess
}