export default function isPasswordCorrect(inputString, maxLength = 48, minLegth = 8) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?@#$%^&*()_+-=]+$/;

    if (!regex.test(inputString)) {
        return {success: false, message: 'Password contains forbidden symbols'};
    }

    if (inputString.length < minLegth || inputString.length > maxLength) {
        return {success: false, message: 'Password must be between 8 and 48 characters long'};
    }

    return {success: true};
}