import isPasswordCorrect from "../isPasswordCorrect";
import isUsernameCorrect from "../isUsernameCorrect";

export default function isRegistrationDataCorrect (username, password) {
    const usernameCorrect = isUsernameCorrect(username);
    const passwordCorrect = isPasswordCorrect(password);

    return [usernameCorrect, passwordCorrect];
}