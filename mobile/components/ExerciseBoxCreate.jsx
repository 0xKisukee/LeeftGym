import "../global.css";
import {Container} from "./ScreenContainer";
import {FlatList, Text, TextInput, View} from "react-native";
import {getExoNameById} from "../api/exercises";
import {useEffect, useState} from "react";
import AppBtn from "./AppBtn";
import SetBoxCreate from "./SetBoxCreate";

export default function ExerciseBoxCreate({exercise, onAddSet, onSetChange, onSetCompleted}) {
    const [exoName, setExoName] = useState("");

    useEffect(() => {
        async function fetchExerciseName() {
            const name = await getExoNameById(exercise.exo_id);
            setExoName(name);
        }

        fetchExerciseName();
    }, []);

    const handleSetChange = (updatedSet) => {
        if (onSetChange) {
            const updatedExercise = {
                ...exercise,
                Sets: exercise.Sets.map(set => 
                    set.order === updatedSet.order ? updatedSet : set
                )
            };
            onSetChange(updatedExercise);
        }
    };

    return (
        <View className="mx-3 my-3 border-2 border-blue-500">
            <Text className="mx-5 text-xl">{exoName}</Text>
            <TextInput
                className="mx-3 my-2"
                placeholder="Plus tard vous pourrez ajouter des notes ici"
            />

            <View
                className="flex-row justify-around border-b-2 border-gray-700 py-2"
            >
                <Text className="text-xl">Série</Text>
                <Text className="text-xl">Kg</Text>
                <Text className="text-xl">Reps</Text>
                <Text className="text-xl">Completed</Text>
            </View>

            {exercise.Sets.length > 0 &&
                <FlatList
                    data={exercise.Sets}
                    renderItem={({item}) => (
                        <SetBoxCreate 
                            set={item} 
                            onSetChange={handleSetChange}
                            onSetCompleted={onSetCompleted}
                        />
                    )}
                />
            }

            <AppBtn
                title="Ajouter une série"
                handlePress={onAddSet}
            />
        </View>
    )
}