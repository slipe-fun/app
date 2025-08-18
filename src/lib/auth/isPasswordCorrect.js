export default function isPasswordCorrect(password, passwordConfirm, t, maxLength = 48, minLegth = 8) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?@#$%^&*()_+-=]+$/;

    if (!regex.test(password)) {
        return {success: false, message: t("auth.password_forbidden_symbols")};
    }

    if (password !== passwordConfirm) {
        return {success: false, message: t("auth.password_not_identical")};
    }

    if (password.length < minLegth || password.length > maxLength) {
        return {success: false, message: t("auth.password_length", { minLegth, maxLength })};
    }

    return {success: true};
}