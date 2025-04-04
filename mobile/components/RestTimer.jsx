import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Fonction pour formater le temps en HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function RestTimer({ restDuration = 120, trigger }) {
    const [isResting, setIsResting] = useState(false);
    const [endTimestamp, setEndTimestamp] = useState(null);
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(new Date().getTime()/1000));
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isResting) return;

        setCurrentTimestamp(Math.floor(new Date().getTime()/1000));
        const interval = setInterval(() => {
            setCurrentTimestamp(Math.floor(new Date().getTime()/1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [isFocused, isResting]);

    useEffect(() => {
        if (currentTimestamp >= endTimestamp) {
            skipRest();
        }
    }, [currentTimestamp]);

    // Start rest when trigger changes
    useEffect(() => {
        if (trigger) {
            startRest();
        }
    }, [trigger]);

    const startRest = () => {
        setIsResting(true);
        setEndTimestamp(Math.floor(new Date().getTime()/1000) + restDuration);
    };

    const adjustTime = (seconds) => {
        if (endTimestamp) {
            setEndTimestamp(endTimestamp + seconds);
        }
    };

    const skipRest = () => {
        setIsResting(false);
        setEndTimestamp(null);
    };

    if (!isResting || !endTimestamp) {
        return null;
    }

    return (
        <View className="flex-row justify-center items-center">
            <TouchableOpacity 
                className="bg-red-500 p-2 rounded-lg"
                onPress={() => adjustTime(-15)}
            >
                <Text className="text-white">-15</Text>
            </TouchableOpacity>

            <Text className="text-2xl font-bold">{formatTime(endTimestamp - currentTimestamp)}</Text>

            <TouchableOpacity 
                className="bg-green-500 p-2 rounded-lg"
                onPress={() => adjustTime(15)}
            >
                <Text className="text-white">+15</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                className="bg-green-500 p-2 rounded-lg"
                onPress={skipRest}
            >
                <Text className="text-white">Passer</Text>
            </TouchableOpacity>
        </View>
    );
}