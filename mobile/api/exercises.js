import { get, post } from "./main";

export async function getAllExos() {
    try {
        return await get("/exos");
    } catch (error) {
        alert(error);
    }
}