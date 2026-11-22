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
        errors.phone = "Please enter your phone number";
    } else if (!PHONE_PATTERN.test(phone.trim())) {
        errors.phone = "Enter a valid phone number";
    }

    if (!preferredSchedule) {
        errors.preferredSchedule = "Please choose a preferred schedule";
    }

    if (learningNote.length > NOTE_MAX_LENGTH) {
        errors.learningNote = `Note can be at most ${NOTE_MAX_LENGTH} characters`;
    }

    return errors;
}


export const TITLE_MIN = 5;
export const TITLE_MAX = 120;
export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 2000;

// Same rules as server side
export function validateTuition(values) {
    const errors = {};

    const title = values.title.trim();
    if (title.length < TITLE_MIN) {
        errors.title = `Title must be at least ${TITLE_MIN} characters`;
    } else if (title.length > TITLE_MAX) {
        errors.title = `Title can be at most ${TITLE_MAX} characters`;
    }

    if (!values.subject) errors.subject = "Please choose a subject";
    if (!values.classLevel) errors.classLevel = "Please choose a class level";
    if (!values.mode) errors.mode = "Choose Online or Offline";

    if (values.mode === "Offline" && values.location.trim().length < 3) {
        errors.location = "Please enter the location for offline classes";
    }

    const fee = Number(values.monthlyFee);
    if (!values.monthlyFee || !Number.isFinite(fee) || fee <= 0) {
        errors.monthlyFee = "Enter a monthly fee greater than 0";
    } else if (fee > 1000000) {
        errors.monthlyFee = "Monthly fee is too large";
    }

    const days = Number(values.daysPerWeek);
    if (!Number.isInteger(days) || days < 1 || days > 7) {
        errors.daysPerWeek = "Choose between 1 and 7 days";
    }

    const description = values.description.trim();
    if (description.length < DESCRIPTION_MIN) {
        errors.description = `Description must be at least ${DESCRIPTION_MIN} characters`;
    } else if (description.length > DESCRIPTION_MAX) {
        errors.description = `Description can be at most ${DESCRIPTION_MAX} characters`;
    }

    return errors;
}


export const BIO_MAX_LENGTH = 500;

export function validateProfile({ name, phone, bio }) {
    const errors = {};

    if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (phone.trim() && !PHONE_PATTERN.test(phone.trim())) {
        errors.phone = "Enter a valid phone number";
    }

    if (bio.trim().length > BIO_MAX_LENGTH) {
        errors.bio = `Bio can be at most ${BIO_MAX_LENGTH} characters`;
    }

    return errors;
}