import validateEmail from './validateEmail'

const loginValidateInfo = (email, password) => {
    let messages = []
    let status = true;
    if (email != "" && password != "") {
        if (validateEmail(email) && password.length >= 6) {
            messages.push("Success");
        }
        else {
            status = false;
            if (password.length < 6) {
                messages.push("password_invalid");
            }
            if (validateEmail(email) == false) {
                messages.push("email_invalid");
            }
        }
    }
    else {
        status = false;
        if (email == "") {
            messages.push("email_missing");
        }
        else if (validateEmail(email) == false) {
            messages.push("email_invalid");
        }
        if (password == "") {
            messages.push("password_missing");
        }
        else if (password.length < 6) {
            messages.push("password_invalid");
        }
    }
    return {
        status: status,
        messages: messages
    }
}

export default loginValidateInfo;