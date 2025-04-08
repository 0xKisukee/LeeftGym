import { View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Title } from "../../components/StyledText";
import { WorkoutFeed } from "../../components/WorkoutFeed";

export default function Home() {
    return (
        <ScreenContainer>
            <View className="flex-1">
                <Title className="mb-4 mt-8">Fil d'actualité</Title>
                <WorkoutFeed />
            </View>
        </ScreenContainer>
    );
}