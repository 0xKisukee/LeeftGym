import "../../global.css";
import {FlatList, Text, TextInput, View, ActivityIndicator} from "react-native";
import SetBox from "./SetBox";
import {useEffect, useState} from "react";
import {BodyText, SubTitle} from "../StyledText";
import {useExos} from "../../contexts/ExoContext";

export default function ExerciseBox({exercise}) {
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
    }, [isLoading, allExos]);

    return (
        <View className="my-1 py-4 border-b border-secondary">
            <View className="flex-row items-center">
                <SubTitle className="mx-5 mb-2">{exoName}</SubTitle>
                {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            </View>

            <View
                style={{flexDirection: "row", justifyContent: "space-around"}}
            >
                <BodyText>Série</BodyText>
                <BodyText>Kg</BodyText>
                <BodyText>Reps</BodyText>
            </View>

            {exercise.Sets.length > 0 &&
                <FlatList
                    data={exercise.Sets.filter(set => set.completed)}
                    renderItem={({item}) => <SetBox set={item}/>}
                />
            }
        </View>
    )
}