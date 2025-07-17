import { api } from "./api";

export default async function (post_id, type = "spam", to_type = "post") {
    try {
        const formData = new FormData();
        formData.append("type", type);
        formData.append("to_type", to_type);
        formData.append("to", post_id);

        await api.media.post("/report/send", formData)?.then(data => console.log(data?.data));
    } catch (error) {
        console.log(error?.response?.data)
        throw error?.response?.data;
    }
}