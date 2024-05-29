import { fetchUserShoppingList } from "@lib/data";
import ShoppingList from "@ui/components/shopping-list";

export default async function Page() {
  const userShoppingList = await fetchUserShoppingList();
  return (
    <div className="w-full flex flex-col">
      <h2 className="heading-l">Shopping list</h2>

      <ShoppingList userShoppingList={userShoppingList} />
    </div>
  );
}
