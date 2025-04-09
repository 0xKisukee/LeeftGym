import { View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Title } from "../../components/StyledText";
import { WorkoutFeed } from "../../components/WorkoutFeed";
import { me } from "../../api/login";
import { useState, useEffect } from "react";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);

    const fetchUser = async () => {
        const infos = await me();
        setUserInfo(infos);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <ScreenContainer>
            <View className="flex-1">
                <Title className="mb-4 mt-8">Fil d'actualité</Title>
                <WorkoutFeed
                    userInfo={userInfo}
                />
            </View>
        </ScreenContainer>
    );
}