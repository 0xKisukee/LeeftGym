import { get, post } from "./main";

export async function getWorkouts() {
    try {
        return await get("/workouts");
    } catch (error) {
        alert(error);
    }
}

export async function getRoutines() {
    try {
        return get("/workouts/routines");
    } catch (error) {
        alert(error);
    }
}

export async function getAll() {
    try {
        return await get("/workouts/getAll");
    } catch (error) {
        alert(error);
    }
}