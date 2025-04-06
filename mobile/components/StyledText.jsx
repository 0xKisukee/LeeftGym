import {Text, TextInput} from "react-native";
import {typography} from "../styles/theme";

export const Title = (props) => {
    return (
        <Text className={typography.header} {...props} />
    )
}

export const SubTitle = (props) => {
    return (
        <Text className={typography.subheader} {...props} />
    )
}

export const BodyText = (props) => {
    return (
        <Text className={typography.body} {...props} />
    )
}