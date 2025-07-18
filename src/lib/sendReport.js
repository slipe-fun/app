import { api } from "./api";

export default async function (post_id, type = "spam", to_type = "post") {
    try {
        const formData = new FormData();
        formData.append("type", type);
        formData.append("to_type", to_type);
        formData.append("to", post_id);

        await api.media.post("/report/send", formData);
    } catch (error) {
        throw error?.response?.data;
    }
}