import validateEmail from './validateEmail'

const registerValidateInfo = (name, email, password, confirmPassword) => {
    let status = true;
    let messages = [];
    if (name != "" && email != "" && password != "" && confirmPassword == password) {
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
        if (name == "") {
            messages.push("name_missing");
        }
        if (email == "") {
            messages.push("email_missing");
        }
        else if (validateEmail(email) == false) {
            messages.push("email_invalid");
        }
        if (password != confirmPassword) {
            messages.push("password_inconsistent")
            messages.push("confirm_inconsistent")
        }
        if (password == "") {
            messages.push("password_missing");
            messages.push("confirm_missing");
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

export default registerValidateInfo;