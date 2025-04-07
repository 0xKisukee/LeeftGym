import "../../global.css";
import {Container} from "../ScreenContainer";
import {FlatList, Text, TextInput, View, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import AppBtn from "../AppBtn";
import SetBoxCreate from "./SetBoxCreate";
import {SubTitle, Title} from "../StyledText";
import {useExos} from "../../contexts/ExoContext";

export default function ExerciseBoxCreate({exercise, onAddSet, onSetChange, onSetCompleted}) {
    const [exoName, setExoName] = useState("");
    const { allExos, isLoading } = useExos();

    const getExoNameById = (exoId) => {
        const exo = allExos.find(exo => exo.id === exoId);
        return exo ? exo.name : "Chargement...";
    };

    useEffect(() => {
        if (!isLoading) {
            const name = getExoNameById(exercise.exo_id);
            setExoName(name);
        }
    }, [isLoading, allExos, exercise.exo_id]);

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
        <View className="my-3 pb-5 border-b border-primary">
            <View className="flex-row items-center">
                <Title className="mx-5 my-2">{exoName}</Title>
                {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            </View>
            <TextInput
                className="text-text h-12 px-2 my-1 w-full bg-bgsec rounded-lg"
                placeholder="Plus tard vous pourrez ajouter des notes ici"
                placeholderTextColor="#a8a8a8"
            />

            <View
                className="flex-row justify-around border-b-2 border-gray-700 py-2"
            >
                <SubTitle>Série</SubTitle>
                <SubTitle>Kg</SubTitle>
                <SubTitle>Reps</SubTitle>
                <SubTitle>Completed</SubTitle>
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
                className="mx-5"
                title="Ajouter une série"
                handlePress={onAddSet}
            />
        </View>
    )
}