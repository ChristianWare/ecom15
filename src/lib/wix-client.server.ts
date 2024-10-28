import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";

export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;

  try {
    const cookieStore = await cookies(); // Await cookies() to resolve the Promise
    tokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (error) {
    console.error("Error parsing tokens:", error); // optional error logging
  }

  return getWixClient(tokens);
});
