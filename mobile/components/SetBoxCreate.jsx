import "../global.css";
import {Container} from "./ScreenContainer";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState, useEffect} from "react";

export default function SetBoxCreate({set, onSetChange, onSetCompleted}) {
    const [order, setOrder] = useState(set.order);
    const [weight, setWeight] = useState(set.weight);
    const [reps, setReps] = useState(set.reps);

    // Update parent component whenever values change
    useEffect(() => {
        if (onSetChange) {
            onSetChange({
                ...set,
                order: parseInt(order) || 0,
                weight: parseFloat(weight) || 0,
                reps: parseInt(reps) || 0
            });
        }
    }, [order, weight, reps]);

    const handleSetCompletion = () => {
        const newCompletedState = !set.completed;
        onSetChange({...set, completed: newCompletedState});
        if (newCompletedState && onSetCompleted) {
            onSetCompleted();
        }
    };

    return (
        <View
            className={`border-b border-gray-700 flex-row justify-around py-2 ${set.completed ? 'bg-green-300' : 'bg-gray-300'}`}
        >
            <Text className="text-xl">
                {order}
            </Text>

            <TextInput
                className="text-xl"
                value={String(weight)}
                onChangeText={(text) => setWeight(text)}
                keyboardType="numeric"
            />

            <TextInput
                className="text-xl"
                value={String(reps)}
                onChangeText={(text) => setReps(text)}
                keyboardType="numeric"
            />

            <TouchableOpacity
                className={`w-8 h-8 rounded-lg ${set.completed ? 'bg-green-500' : 'bg-gray-500'}`}
                onPress={handleSetCompletion}
            >
                <Text className="text-xl text-center text-text">
                    {set.completed ? 'v' : 'x'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}