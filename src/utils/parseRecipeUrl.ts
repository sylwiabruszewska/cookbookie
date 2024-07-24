export function parseRecipeUrl(url: string) {
  const uuidPattern =
    /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;

  const match = url.match(uuidPattern);

  let id: string;

  if (!match) {
    id = "";
    return id;
  }

  id = match[0];
  return id;
}
