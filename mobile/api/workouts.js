import { get, post } from "./main";

export async function getWorkouts() {
    try {
        return await get("/workouts");
    } catch (error) {
        alert(error);
    }
}

export async function getWorkout(id) {
    try {
        return await get(`/workouts/${id}`);
    } catch (error) {
        alert(error);
    }
}

export async function getRoutines() {
    try {
        return await get("/workouts/routines");
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

export async function likeWorkout(workoutId) {
    try {
        return await post(`/workouts/${workoutId}/likes`);
    } catch (error) {
        console.error("Error liking workout:", error);
        throw error;
    }
}