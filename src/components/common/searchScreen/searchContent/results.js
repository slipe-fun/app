import { View, Text } from "tamagui";
import useFetchDataByQuery from "../../../../hooks/useFetchPostsByQuery";

export const Results = (query, type) => {
    // const { data, setPage } = useFetchDataByQuery(query, type);

    return (
        <View f={1} justifyContent="center" alignItems="center">
            <Text fz="$7" lh="$7" fw="$3" color="$secondaryText">Results</Text>
        </View>
    );
};