const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 6;

export function validateSignUp({ name, email, password }) {
    const errors = {};

    if (!name.trim()) {
        errors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
        errors.email = "Please enter your email address";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = "Enter a valid email address";
    }

    if (!password) {
        errors.password = "Please create a password";
    } else if (password.length < PASSWORD_MIN_LENGTH) {
        errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }

    return errors;
}


export function validateSignIn({ email, password }) {
    const errors = {};

    if (!email.trim()) {
        errors.email = "Please enter your email address";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = "Enter a valid email address";
    }

    if (!password) {
        errors.password = "Please enter your password";
    } else if (password.length < PASSWORD_MIN_LENGTH) {
        errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }

    return errors;
}


const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/;

export const NOTE_MAX_LENGTH = 500;

export function validateApplication({ phone, preferredSchedule, learningNote }) {
    const errors = {};

    if (!phone.trim()) {
        errors.phone = "Please enter your phone number.";
    } else if (!PHONE_PATTERN.test(phone.trim())) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!preferredSchedule) {
        errors.preferredSchedule = "Please choose a preferred schedule.";
    }

    if (learningNote.length > NOTE_MAX_LENGTH) {
        errors.learningNote = `Note can be at most ${NOTE_MAX_LENGTH} characters.`;
    }

    return errors;
}
