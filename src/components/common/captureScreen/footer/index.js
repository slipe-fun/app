import useInsets from "@hooks/useInsets"
import { View, XStack } from "tamagui"
import CapturePickGalleryImage from "./pickGalleryImage";
import CaptureRotateButton from "./rotateButton";
import SwitchFormat from "./formatSwitcher";

const CaptureFooter = () => {
    const insets = useInsets();
    return(
        <XStack pb={insets.bottom} pt="$6" ph="$7" w='$full'>
            <CapturePickGalleryImage/>
            <SwitchFormat/>
            <CaptureRotateButton/>
        </XStack>
    )
}

export default CaptureFooter