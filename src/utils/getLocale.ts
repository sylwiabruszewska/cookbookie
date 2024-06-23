import { cookies } from "next/headers";

export default function getLocale() {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  return localeCookie ? localeCookie.value : "en";
}
