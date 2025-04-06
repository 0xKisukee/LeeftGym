import "../global.css";
import {FlatList, Text, TextInput, View} from "react-native";
import SetBox from "./SetBox";
import {getExoNameById} from "../api/exercises";
import {useEffect, useState} from "react";
import {BodyText, SubTitle} from "./StyledText";

export default function ExerciseBox({exercise}) {
    const [exoName, setExoName] = useState("");

    useEffect(() => {
        async function fetchExerciseName() {
            const name = await getExoNameById(exercise.exo_id);
            setExoName(name);
        }

        fetchExerciseName();
    }, []);

    return (
        <View className="my-1 py-4 border-b border-secondary">
            <SubTitle className="mx-5 mb-2">{exoName}</SubTitle>

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