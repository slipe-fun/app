import useInsets from "@hooks/useInsets"
import { View } from "tamagui"
import CapturePickGalleryImage from "./pickGalleryImage";

const CaptureFooter = () => {
    const insets = useInsets();
    return(
        <View pb={insets.bottom} pt="$6" ph="$7" w='$full' flexDirection="row">
            <CapturePickGalleryImage/>
        </View>
    )
}

export default CaptureFooter