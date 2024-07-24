export function generateRecipeUrl(title: string, id: string): string {
  const sanitizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const url = `${sanitizedTitle}-${id}`;

  return url;
}
