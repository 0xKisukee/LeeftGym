import {Text, TextInput} from "react-native";
import {typography} from "../styles/theme";

export const Title = ({className, ...props}) => {
    return (
        <Text className={`${typography.header} ${className || ''}`} {...props} />
    )
}

export const SubTitle = ({className, ...props}) => {
    return (
        <Text className={`${typography.subheader} ${className || ''}`} {...props} />
    )
}

export const BodyText = ({className, ...props}) => {
    return (
        <Text className={`${typography.body} ${className || ''}`} {...props} />
    )
}

export const MiniText = ({className, ...props}) => {
    return (
        <Text className={`${typography.mini} ${className || ''}`} {...props} />
    )
}