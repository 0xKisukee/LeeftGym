import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import {ScreenContainer} from "../../components/ScreenContainer";
import {Title} from "../../components/StyledText";
export default function Home() {
// this will become a file route as well
    return (
        <ScreenContainer>
            <Title>Home</Title>
        </ScreenContainer>
    );
}