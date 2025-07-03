import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View } from "react-native";

const EditorToolsBar = () => {
    const insets = useSafeAreaInsets();
    return(
        <View style={[{paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 8}]}>

        </View>
    )
}

export default EditorToolsBar