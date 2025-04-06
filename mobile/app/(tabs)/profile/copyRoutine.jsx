import {Text, View} from "react-native";
import AppBtn from "../../../components/AppBtn";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLocalSearchParams} from "expo-router";
import {ScreenContainer} from "../../../components/ScreenContainer";
import {Title} from "../../../components/StyledText";
import pushWorkout from "../../../api/pushWorkout";

export default function CopyRoutine() {
    const { workout } = useLocalSearchParams();
    const workoutData = JSON.parse(workout);

    const copyAsRoutine = async () => {
        const routineWorkout = {
            ...workoutData,
            is_routine: true,
            started_at: null,
            completed_at: null,
        };
        console.log(routineWorkout)
        await pushWorkout(routineWorkout);
    }

    return (
        <ScreenContainer>
            <Title>Copy as Routine</Title>
            <View className="flex-row justify-between mt-4">
                <AppBtn
                    title="Cancel"
                    handlePress={() => {
                        router.back()
                        router.push("/profile")
                    }}
                />
                <AppBtn
                    title="Copy as Routine"
                    handlePress={() => {
                        copyAsRoutine()
                        router.back()
                        router.push("/profile")
                    }}
                />
            </View>
        </ScreenContainer>
    );
} 