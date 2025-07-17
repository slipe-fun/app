import { api } from "./api";

export default async function (post_id) {
    try {
        await api.v2.post(`/post/${post_id}/view`)
    } catch (err) {
        console.log(err?.response?.data)
    }
}