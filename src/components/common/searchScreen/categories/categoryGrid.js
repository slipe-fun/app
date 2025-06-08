import { YStack, XStack } from "tamagui";
import { categories } from "../../../../constants/categories";
import Category from "./category";

const rowsHeight = [171, 125, 150, 145, 160, 140]

const CategoryGrid = () => {
  const categoryPairs = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryPairs.push(categories.slice(i, i + 2));
  }

  return (
    <YStack w="$full" gap="$6" ph="$6">
      {categoryPairs.map((pair, rowIndex) => (
        <XStack w="$full" key={rowIndex} flexDirection="row" gap="$6" h={rowsHeight[rowIndex]}>
          {pair.map((category, colIndex) => (
           <Category rowIndex={rowIndex} colIndex={colIndex} category={category} key={colIndex} />
          ))}
        </XStack>
      ))}
    </YStack>
  );
};

export default CategoryGrid;
