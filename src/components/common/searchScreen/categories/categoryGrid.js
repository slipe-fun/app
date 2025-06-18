import { YStack, XStack } from "tamagui";
import { categories } from "@constants/categories";
import Category from "./category";
import useFetchCategoryStatistics from "@hooks/useFetchCategoryStatistics";

const rowsHeight = [171, 125, 150, 145, 160, 140]

const CategoryGrid = () => {
  const { statistics, isLoading, error } = useFetchCategoryStatistics()

  const categoryPairs = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryPairs.push(categories.slice(i, i + 2));
  }


  return (
    <YStack w="$full" gap="$6" ph="$6">
      {categoryPairs.map((pair, rowIndex) => (
        <XStack w="$full" key={rowIndex} flexDirection="row" gap="$6" h={rowsHeight[rowIndex]}>
          {pair.map((category, colIndex) => (
            <Category colIndex={colIndex} category={{
              ...category, count: statistics ? statistics?.find(object => {
                return object.category === category.name.toLowerCase()
              }) || "???" : "???"
            }} key={colIndex} />
          ))}
        </XStack>
      ))}
    </YStack>
  );
};

export default CategoryGrid;
