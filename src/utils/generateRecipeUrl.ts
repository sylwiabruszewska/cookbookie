import slugify from "slugify";

export function generateRecipeUrl(title: string, id: string): string {
  const sanitizedTitle = slugify(title, { lower: true, strict: true });

  const url = `${sanitizedTitle}-${id}`;

  return url;
}
