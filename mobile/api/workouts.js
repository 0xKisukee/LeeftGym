import { get, post, del } from "./main";

export async function pushWorkout(workout) {
    try {
        console.log("Pushing this workout to db:", workout);

        return await post(
            "/workouts/storeFull",
            {
                name: workout.name,
                is_private: workout.is_private,
                is_routine: workout.is_routine || false,
                started_at: workout.started_at,
                completed_at: new Date(),
                Exercises: workout.Exercises, // this contains sets
            }
        );
    } catch (error) {
        alert(error);
    }
}

export async function getWorkouts() {
    try {
        return await get("/workouts");
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

export async function deleteWorkout(id) {
    try {
        return await del(`/workouts/${id}`);
    } catch (error) {
        console.error("Error deleting workout:", error);
        throw error;
    }
}