import "../../global.css";
import {View} from "react-native";
import {BodyText, MiniText} from "../StyledText";
import {getTimeAgo} from "../../utils/timeUtils";

export default function CommentBox({comment}) {
    return (
        <View className="mb-6">
            <View className="flex-row justify-between">
                <BodyText className="font-bold mb-1">{comment.User.username}</BodyText>
                <MiniText>{getTimeAgo(comment.createdAt)}</MiniText>
            </View>

            <View>
                <BodyText>{comment.content}</BodyText>
            </View>
        </View>
    )
}