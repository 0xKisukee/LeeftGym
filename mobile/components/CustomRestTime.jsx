import {StyleSheet, TouchableOpacity, View} from "react-native";
import {BodyText} from "./StyledText";
import {useState} from "react";

// Fonction pour formater le temps en MM:SS
function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function CustomRestTime ({exoRestTime}) {
    const [restTime, setRestTime] = useState(exoRestTime);
    //setRestTime should be called through the roll selector

    return (
        <TouchableOpacity className="flex-row items-center m-4">
            <View></View>
            <BodyText className="font-bold text-primary mr-1">Minuteur de repos :</BodyText>
            <BodyText className="font-bold text-primary">{formatTime(restTime)}</BodyText>
        </TouchableOpacity>
    );
}