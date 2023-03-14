export const emailValidator = email => {
    if (!email) {
        return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Please enter valid email address";
    }
    return "";
};

export const passwordValidator = password => {
    if (!password) {
        return "Password is required";
    } else if (!new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.{8,})\S+$/).test(password)) {
        return "Password should contain minimum 8 characters with at least 1 Uppercase and 1 special character";
    }
    return "";
};

export const textFieldValidator = textField => {
    if (!textField) {
        return "This field is required"
    }
}