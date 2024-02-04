export const validation = (values) => {
    const errors = {};

    if (!values.email) errors.email = "Please enter email";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email format. Please check and try again.";
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
    return errors;
};
