import ShoppingList from "@ui/components/shopping-list";

export default function Page() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-xl font-semibold mb-8">Shopping list</h2>

      <ShoppingList />
    </div>
  );
}
