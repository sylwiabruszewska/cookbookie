import RecipeCardLarge from "@/app/ui/components/recipe-card-large";

export default function Page({ params }: { params: { recipeId: string } }) {
  return (
    <div>
      <p>Recipe ID {params.recipeId}</p>
      <RecipeCardLarge />
    </div>
  );
}
