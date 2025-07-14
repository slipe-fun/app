import { View, Text } from "tamagui";
import useFetchDataByQuery from "@hooks/useFetchPostsByQuery";
import useSearchStore from "@stores/searchScreen";

export const Results = () => {
  const query = useSearchStore((state) => state.query);
  const type = useSearchStore((state) => state.type)
  const { data, setPage } = useFetchDataByQuery(query, type);

  console.log(data, query)

  return (
    <View f={1} justifyContent="center" alignItems="center">
      <Text fz="$7" lh="$7" fw="$3" color="$secondaryText">
        {data.map((item) => <Text key={item.id}>{item.in_search}</Text>)}
      </Text>
    </View>
  );
};
