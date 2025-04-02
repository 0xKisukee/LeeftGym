import "../global.css";
import {SafeAreaView, Text, View} from "react-native";
import {Container} from "./Container";

export default function BetaBar() {
    return (
        <Container>
            <View className="bg-red-500 my-2">
                <Text className="text-center my-4">APPLICATION EN BETA</Text>
            </View>
        </Container>
    )
}