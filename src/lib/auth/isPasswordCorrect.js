export default function isPasswordCorrect(password, passwordConfirm, maxLength = 48, minLegth = 8) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?@#$%^&*()_+-=]+$/;

    if (!regex.test(password)) {
        return {success: false, message: 'Password contains forbidden symbols'};
    }

    if (password !== passwordConfirm) {
        return {success: false, message: 'Passwords must be identical'};
    }

    if (password.length < minLegth || password.length > maxLength) {
        return {success: false, message: `Password must be between ${minLegth} and ${maxLength} characters long`};
    }

    return {success: true};
}