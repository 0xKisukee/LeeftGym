import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRestTimes = async (restTimes) => {
    try {
        await AsyncStorage.setItem("restTimes", JSON.stringify(restTimes));
        return true;
    } catch (error) {
        console.log("Erreur lors de la sauvegarde des temps de repos:", error);
        return false;
    }
}

export const getRestTimes = async () => {
    try {
        const data = await AsyncStorage.getItem("restTimes");
        console.log("getRestTimes", data);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Erreur lors de la récupération des temps de repos:", error);
        return [];
    }
}

export const getExoRestTime = async (exoId) => {
    try {
        const data = await getRestTimes();

        // Check if the exercise already doesn't exist in the list => default rest time
        const exoExists = data.some(exo => exo.id === exoId);
        if (!exoExists) {
            console.log("rest time defaults to:", 120);
            return 120; // THIS IS THE DEFAULT REST TIME FOR NEW EXOS
        }

        // Find the exercise in the array and return its rest time
        const exercise = data.find(exo => exo.id === exoId);
        console.log("rest time found:", exercise.restTime);
        return exercise.restTime || 999999; // CATCH BUG
    } catch (error) {
        console.error("Erreur lors de la récupération du temps de repos:", error);
        return false;
    }
}

export const updateExoRestTime = async (exoId, newRestTime) => {
    try {
        const oldData = await getRestTimes();
        
        // Check if the exercise already exists in the list
        const exoExists = oldData.some(exo => exo.id === exoId);
        
        let updatedData;
        if (exoExists) {
            // Update existing exercise
            updatedData = oldData.map(exo =>
                exo.id === exoId ? {...exo, restTime: newRestTime} : exo
            );
        } else {
            // Add new exercise to the list
            updatedData = [...oldData, { id: exoId, restTime: newRestTime }];
        }

        console.log("hmmmm updatedData", updatedData);

        await saveRestTimes(updatedData);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}