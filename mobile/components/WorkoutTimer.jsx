import { useState, useEffect } from "react";
import { Text } from "react-native";
import {useIsFocused} from "@react-navigation/native";

// Fonction pour formater le temps en HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function WorkoutTimer({ startTimestamp }) {
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(new Date().getTime()/1000));
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;

        // Better UX
        setCurrentTimestamp(Math.floor(new Date().getTime()/1000));

        const interval = setInterval(() => {
            setCurrentTimestamp(Math.floor(new Date().getTime()/1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isFocused]);

    return <Text className="text-2xl font-bold">{formatTime(currentTimestamp - startTimestamp)}</Text>;
}
