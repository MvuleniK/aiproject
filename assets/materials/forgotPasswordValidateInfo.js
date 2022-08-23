import validateEmail from "./validateEmail"

const forgotPasswordValidateInfo = (email) => {
    if (email != "" && validateEmail(email)) {
        return {
            status: true,
            message: "Success"
        }
    }
    else {
        if (email == "") {
            return {
                status: false,
                message: "email_missing"
            }
        }
        else if (validateEmail(email) == false) {
            return {
                status: false,
                message: 'email_invalid'
            }
        }
    }
}

export default forgotPasswordValidateInfo