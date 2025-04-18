import { View } from "react-native";
import { CameraView } from "expo-camera";
import { styles } from "../styles/captureImageStyles";
import { CaptureImageFooter } from "./footer";
import { CaptureImageHeader } from "./header";
import { useSelector } from "react-redux";
import { selectActiveFacing } from "../../../../reducers/publishScreen";

export const CaptureImage = () => {
    const facing = useSelector(selectActiveFacing)
    
	return (
		<View style={styles.captureImage}>
			<CameraView style={styles.cameraView} facing={facing} mode='video' />
            <CaptureImageFooter/>
            <CaptureImageHeader/>
		</View>
	);
};
