import Icon from "@components/ui/icon";
import { Button } from "tamagui";

const CaptureFooterPublishButton = () => {
    return (
        <Button backgroundColor='$primary' w='$13' h="$13" br="$full">
            <Icon icon="publish" size={28} color="white" />
        </Button>
    )
}

export default CaptureFooterPublishButton
