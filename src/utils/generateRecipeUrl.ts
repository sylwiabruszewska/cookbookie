import slugify from "slugify";

export function generateRecipeUrl(title: string): string {
  const sanitizedTitle = slugify(title, { lower: true, strict: true });

  const url = `${sanitizedTitle}`;

  return url;
}
