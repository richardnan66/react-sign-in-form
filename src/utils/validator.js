export const validateEmail = (email) => {
    if (email.length === 0) {
        return '*Required';
    } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            return 'Invalid email';
        };
    }
    return null;
}

export const validatePassowrd = (password) => {
    if (password.length === 0) {
        return '*Required';
    } else {
        if (password.length < 6) {
            return 'Should be at least 6 characters long';
        };
    }
    return null;
}
  