export default function isUsernameCorrect(username, t, maxLength = 24, minLength = 2) {
    if (username.length < minLength || username.length > maxLength) {
        return {success: false, message: t("auth.username_length", { minLength, maxLength })}
    }

    if (!/^(?!\s)(?=.*[a-zA-Z])[a-zA-Z0-9](?!.*[_\.\-]$)[a-zA-Z0-9_.-]{0,14}[a-zA-Z0-9]$/.test(username)) {
        return {success: false, message: t("auth.username_forbidden_symbols")}
    }

    return {success: true};
}