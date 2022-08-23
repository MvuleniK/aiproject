const validatePassword = (password, confirmPassword) => {
    let status = true;
    let messages = '';
    if (password != "" && confirmPassword == password) {
        if (password.length >= 6) {
            messages = "Success";
        }
        else {
            status = false;
            messages = "password_invalid";
        }
    }
    else {
        status = false;
        if (password != confirmPassword) {
            messages = "password_inconsistent";
        }
        else if (password == "") {
            messages = "password_missing";
        }
    }
    return {
        status: status,
        messages: messages
    }
}

export default validatePassword;