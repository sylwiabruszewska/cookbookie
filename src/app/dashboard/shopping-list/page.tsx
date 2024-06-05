import { ShoppingListContent } from "@ui/components/shopping-list/shopping-list-content";

export default async function Page() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="heading-l">Shopping list</h2>

      <ShoppingListContent />
    </div>
  );
}
