import "../global.css";
import {Text, TextInput, View} from "react-native";
import {BodyText} from "./StyledText";

export default function SetBox({set}) {
    return (
        <View
            style={{flexDirection: "row", justifyContent: "space-around"}}
        >
            <BodyText>{set.order}</BodyText>
            <BodyText>{set.weight}</BodyText>
            <BodyText>{set.reps}</BodyText>
        </View>
    )
}