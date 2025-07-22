import ShaderShi from "@components/ui/shaderShi";
import { View } from "tamagui";

const CapturePermissionDenied = () => {
    return (
        <View f={1}>
            <ShaderShi style={{ width: "100%", height: "100%" }} colors={["#8257DB", "#FF9F0A", "#FF1A1A", "#FF668B"]} />
        </View>
    );
};

export default CapturePermissionDenied;
