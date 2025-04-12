import {StyleSheet, TouchableOpacity, View, Modal, Text} from "react-native";
import {BodyText} from "../StyledText";
import {useState} from "react";
import AppBtn from "../AppBtn";

// Fonction pour formater le temps en MM:SS
function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function CustomRestTime ({exoRestTime, onRestTimeChange}) {
    const [restTime, setRestTime] = useState(exoRestTime);
    const [modalVisible, setModalVisible] = useState(false);
    const [minutes, setMinutes] = useState(Math.floor(restTime / 60));
    const [seconds, setSeconds] = useState(restTime % 60);

    const handleTimeChange = (newMinutes, newSeconds) => {
        const newRestTime = newMinutes * 60 + newSeconds;
        setRestTime(newRestTime);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        
        if (onRestTimeChange) {
            onRestTimeChange(newRestTime);
        }
    };

    const incrementMinutes = () => {
        if (minutes < 6) {
            handleTimeChange(minutes + 1, seconds);
        }
    };

    const decrementMinutes = () => {
        if (minutes > 0) {
            handleTimeChange(minutes - 1, seconds);
        }
    };

    const incrementSeconds = () => {
        if (seconds < 55) {
            handleTimeChange(minutes, seconds + 5);
        } else if (minutes < 6) {
            handleTimeChange(minutes + 1, 0);
        }
    };

    const decrementSeconds = () => {
        if (seconds > 0) {
            handleTimeChange(minutes, seconds - 5);
        } else if (minutes > 0) {
            handleTimeChange(minutes - 1, 55);
        }
    };

    return (
        <>
            <TouchableOpacity 
                className="flex-row items-center m-4"
                onPress={() => setModalVisible(true)}
            >
                <View></View>
                <BodyText className="font-bold text-primary mr-1">Minuteur de repos :</BodyText>
                <BodyText className="font-bold text-primary">{formatTime(restTime)}</BodyText>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-bgsec p-5 rounded-lg w-4/5">
                        <BodyText className="text-center text-xl mb-4">Ajuster le temps de repos</BodyText>
                        
                        <View className="flex-row justify-center items-center mb-4">
                            <View className="items-center mr-4">
                                <BodyText className="text-center mb-2">Minutes</BodyText>
                                <View className="flex-row items-center">
                                    <TouchableOpacity 
                                        className="bg-primary p-2 rounded-l-lg"
                                        onPress={decrementMinutes}
                                    >
                                        <Text className="text-white text-xl">-</Text>
                                    </TouchableOpacity>
                                    <View className="bg-bgsec px-4 py-2 border-t border-b border-gray-700">
                                        <Text className="text-white text-xl">{minutes}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        className="bg-primary p-2 rounded-r-lg"
                                        onPress={incrementMinutes}
                                    >
                                        <Text className="text-white text-xl">+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View className="items-center">
                                <BodyText className="text-center mb-2">Secondes</BodyText>
                                <View className="flex-row items-center">
                                    <TouchableOpacity 
                                        className="bg-primary p-2 rounded-l-lg"
                                        onPress={decrementSeconds}
                                    >
                                        <Text className="text-white text-xl">-</Text>
                                    </TouchableOpacity>
                                    <View className="bg-bgsec px-4 py-2 border-t border-b border-gray-700">
                                        <Text className="text-white text-xl">{seconds}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        className="bg-primary p-2 rounded-r-lg"
                                        onPress={incrementSeconds}
                                    >
                                        <Text className="text-white text-xl">+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                        <AppBtn
                            className="mx-auto"
                            title="Valider"
                            handlePress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}