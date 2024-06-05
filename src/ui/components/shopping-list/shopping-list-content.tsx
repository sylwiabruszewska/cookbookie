import { Suspense } from "react";

import { fetchUserShoppingList } from "@lib/data";
import { ShoppingList } from "@ui/components/shopping-list";
import { Loader } from "@ui/components/loader";

export async function ShoppingListContent() {
  const userShoppingList = await fetchUserShoppingList();
  return (
    <Suspense fallback={<Loader />}>
      <ShoppingList userShoppingList={userShoppingList} />
    </Suspense>
  );
}
