export const validation = (values) => {
    const errors = {};
    if (!values.full_name) {
        errors.full_name = "Name cannot be empty";
    }
    if (!values.username) {
        errors.username = "Username cannot be empty";
    } else if (values.username.includes(" ")) {
        errors.username = "Username must not contain empty spaces";
    } else if (values.username.length < 5) {
        errors.username = "Username must be at least 5 characters";
    } else if (values.username.length > 10) {
        errors.username = "Username is greater than 10 characters";
    }
    if (!values.email) errors.email = "Please enter email";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email format. Please check and try again.";
    }
    if (!values.birth_date) {
        errors.birth_date = "Please select a birth date";
    }
    if (!values.password) {
        errors.password = "Please enter a password";
    } else if (values.password.includes(" ")) {
        errors.password = "Password must not contain empty spaces";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (values.password.length > 20) {
        errors.password = "Password is greater than 20 characters";
    }
    if (!values.cpassword) {
        errors.cpassword = "Confirm password";
    } else if (values.password != values.cpassword) {
        errors.cpassword = "Passwords do not match. Please try again";
    }
    return errors;
};
