import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (event.path === "/dashboard" && !session?.user) {
    await sendRedirect(event, "/", 302);
  }

  if (event.path === "/" && session?.user) {
    await sendRedirect(event, "/dashboard", 200);
  }
});
